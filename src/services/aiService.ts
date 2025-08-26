import { Product, Recommendation } from '../types';
import { PRODUCT_CATALOG } from '../data/productCatalog';
import { getCurrentCurrency, convertCurrency } from '../utils/helpers';

// Note: In a production app, this should be stored securely (env variables, secure storage)
// For this demo, you'll need to replace with your actual Gemini API key
// Get your free API key from: https://makersuite.google.com/app/apikey
// get keys from .key file usinrg react native code 
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface AIRecommendationResponse {
  recommendations: Array<{
    productId: string;
    score: number;
    reasons: string[];
    matchedFeatures: string[];
  }>;
}

export class AIService {
  private static instance: AIService;

  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Get product recommendations based on user query using Gemini AI
   */
  async getRecommendations(userQuery: string): Promise<Recommendation[]> {
    // Always try fallback first in development/mobile to avoid API issues
    if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 10) {
      console.log('Using fallback recommendations (no valid API key)');
      return this.getFallbackRecommendations(userQuery);
    }

    try {
      // Create a comprehensive prompt for Gemini
      const prompt = this.createPrompt(userQuery);

      // Add timeout for mobile networks
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // Make API call to Gemini
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.warn(`Gemini API error (${response.status}): ${errorText}`);
        throw new Error(`API returned ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        console.warn('No candidates in Gemini response');
        throw new Error('No response from Gemini API');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      
      // Parse the AI response and create recommendations
      const aiRecommendations = this.parseAIResponse(aiResponse, userQuery);
      
      // If AI parsing fails, use fallback
      if (aiRecommendations.length === 0) {
        console.log('AI response parsing failed, using fallback');
        return this.getFallbackRecommendations(userQuery);
      }
      
      console.log(`Successfully got ${aiRecommendations.length} AI recommendations`);
      return aiRecommendations;
      
    } catch (error) {
      const err = error as any;
      if (err.name === 'AbortError') {
        console.warn('Gemini API request timed out, using fallback');
      } else {
        console.warn('Error getting AI recommendations:', err.message || 'Unknown error');
      }
      
      // Always fallback to keyword matching if AI fails
      console.log('Using fallback recommendation system');
      return this.getFallbackRecommendations(userQuery);
    }
  }

  /**
   * Create a detailed prompt for Gemini to analyze user needs
   */
  private createPrompt(userQuery: string): string {
    const productData = PRODUCT_CATALOG.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      features: product.features,
      specifications: product.specifications,
      price: product.price,
      brand: product.brand,
      rating: product.rating,
      tags: product.tags
    }));

    return `
You are an expert product advisor AI. A user is looking for product recommendations based on their natural language query.

User Query: "${userQuery}"

Available Products:
${JSON.stringify(productData, null, 2)}

Your task:
1. Analyze the user's query to understand their needs, preferences, and constraints
2. Score each product from 0-100 based on how well it matches the user's requirements
3. Provide specific reasons why each recommended product fits their needs
4. Identify which features of each product specifically match what they're looking for

Please respond ONLY with a valid JSON object in this exact format:
{
  "recommendations": [
    {
      "productId": "product_id_here",
      "score": 95,
      "reasons": [
        "Specific reason why this product fits their needs",
        "Another reason explaining the match"
      ],
      "matchedFeatures": [
        "Feature 1 that matches their query",
        "Feature 2 that matches their query"
      ]
    }
  ]
}

Rules:
- Only recommend products with a score of 60 or higher
- Order recommendations by score (highest first)
- Limit to maximum 5 recommendations
- Be specific in your reasons - reference actual product features and user needs
- Focus on the most relevant matches for their query
- Consider price, features, brand preferences, and use cases mentioned in the query
`;
  }

  /**
   * Parse the AI response and convert to Recommendation objects
   */
  private parseAIResponse(aiResponse: string, userQuery: string): Recommendation[] {
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }

      const parsed: AIRecommendationResponse = JSON.parse(jsonMatch[0]);
      
      const recommendations: Recommendation[] = [];

      for (const aiRec of parsed.recommendations) {
        const product = PRODUCT_CATALOG.find(p => p.id === aiRec.productId);
        if (product) {
          recommendations.push({
            product,
            score: aiRec.score / 100, // Convert to 0-1 scale
            reasons: aiRec.reasons,
            matchedFeatures: aiRec.matchedFeatures
          });
        }
      }

      return recommendations.sort((a, b) => b.score - a.score);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      
      // Fallback to keyword matching
      return this.getFallbackRecommendations(userQuery);
    }
  }

  /**
   * Fallback recommendation system using keyword matching
   */
  private getFallbackRecommendations(userQuery: string): Recommendation[] {
    console.log(`Getting fallback recommendations for: "${userQuery}"`);
    const query = userQuery.toLowerCase().trim(); // Add trim() to remove trailing spaces
    const recommendations: Recommendation[] = [];

    for (const product of PRODUCT_CATALOG) {
      let score = 0;
      const reasons: string[] = [];
      const matchedFeatures: string[] = [];

      // Check name match
      if (product.name.toLowerCase().includes(query)) {
        score += 30;
        reasons.push(`Product name matches your search`);
      }

      // Check category match (more flexible)
      if (product.category.toLowerCase().includes(query) || query.includes(product.category.toLowerCase())) {
        score += 25;
        reasons.push(`This is a ${product.category.toLowerCase()} which matches your request`);
      }

      // Check description match
      if (product.description.toLowerCase().includes(query)) {
        score += 20;
        reasons.push(`Product description aligns with your needs`);
      }

      // Check features match
      for (const feature of product.features) {
        if (feature.toLowerCase().includes(query) || query.includes(feature.toLowerCase())) {
          score += 15;
          matchedFeatures.push(feature);
        }
      }

      // Check tags match
      for (const tag of product.tags) {
        if (tag.toLowerCase().includes(query) || query.includes(tag.toLowerCase())) {
          score += 10;
          if (!matchedFeatures.includes(tag)) {
            matchedFeatures.push(tag);
          }
        }
      }

      // Enhanced keyword analysis for common requests
      const queryWords = query.split(' ').filter(word => word.length > 2); // Filter out small words
      
      // Technology keywords with variations
      if (queryWords.some(word => ['smartphone', 'phone', 'mobile', 'iphone', 'android'].includes(word))) {
        if (product.category === 'Smartphones') {
          score += 30;
          reasons.push('Perfect smartphone recommendation');
        }
      }
      
      if (queryWords.some(word => ['laptop', 'computer', 'pc', 'notebook', 'macbook'].includes(word))) {
        if (product.category === 'Laptops') {
          score += 30;
          reasons.push('Great laptop option for your needs');
        }
      }
      
      if (queryWords.some(word => ['tablet', 'ipad', 'surface'].includes(word))) {
        if (product.category === 'Tablets' || product.name.toLowerCase().includes('ipad') || product.name.toLowerCase().includes('tablet')) {
          score += 30;
          reasons.push('Excellent tablet choice');
        }
      }
      
      if (queryWords.some(word => ['headphones', 'earphones', 'audio', 'headset', 'earbuds'].includes(word))) {
        if (product.category === 'Headphones' || product.category === 'Audio') {
          score += 30;
          reasons.push('Excellent audio device');
        }
      }

      if (queryWords.some(word => ['watch', 'smartwatch', 'fitness', 'tracker'].includes(word))) {
        if (product.category === 'Smartwatches' || product.category === 'Wearables') {
          score += 30;
          reasons.push('Great smartwatch option');
        }
      }

      if (queryWords.some(word => ['camera', 'photography', 'photo', 'lens'].includes(word))) {
        if (product.category === 'Cameras' || product.category === 'Photography') {
          score += 30;
          reasons.push('Perfect camera for your needs');
        }
      }

      // Use case keywords
      if (query.includes('lightweight') || query.includes('portable') || query.includes('travel')) {
        if (product.tags.includes('lightweight') || product.tags.includes('portable') || product.tags.includes('travel')) {
          score += 20;
          reasons.push('Perfect for travel with its lightweight design');
        }
      }

      if (query.includes('battery') || query.includes('long lasting')) {
        if (product.tags.includes('long battery')) {
          score += 20;
          reasons.push('Excellent battery life for all-day use');
        }
      }

      if (query.includes('gaming') || query.includes('games')) {
        if (product.tags.includes('gaming')) {
          score += 25;
          reasons.push('Optimized for gaming performance');
        }
      }

      if (query.includes('business') || query.includes('work') || query.includes('professional')) {
        if (product.tags.includes('business') || product.tags.includes('professional')) {
          score += 20;
          reasons.push('Designed for professional use');
        }
      }

      // Budget keywords with currency awareness
      const currentCurrency = getCurrentCurrency();
      if (query.includes('budget') || query.includes('cheap') || query.includes('affordable')) {
        const budgetThreshold = currentCurrency.code === 'USD' ? 500 : convertCurrency(500, currentCurrency.code);
        if (product.price < 500) { // Always compare in USD for consistency
          score += 15;
          reasons.push('Great value for money');
        }
      }

      if (query.includes('premium') || query.includes('high-end') || query.includes('expensive')) {
        if (product.price > 1000) {
          score += 15;
          reasons.push('Premium quality product');
        }
      }

      // Price-specific searches (handle different currency mentions)
      const priceMatches = query.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:usd|dollars?|₹|rupees?|€|euros?|£|pounds?)/gi);
      if (priceMatches) {
        // Extract price from query and compare
        const mentionedPrice = parseFloat(priceMatches[0].replace(/[^\d.]/g, ''));
        let usdEquivalent = mentionedPrice;
        
        // Convert to USD if needed
        if (query.includes('₹') || query.includes('rupee')) {
          usdEquivalent = mentionedPrice / 83.12; // Convert INR to USD
        } else if (query.includes('€') || query.includes('euro')) {
          usdEquivalent = mentionedPrice / 0.92; // Convert EUR to USD
        }
        
        if (Math.abs(product.price - usdEquivalent) < usdEquivalent * 0.3) { // Within 30% of mentioned price
          score += 20;
          reasons.push(`Price matches your budget of ${priceMatches[0]}`);
        }
      }

      // Only include products with decent match scores
      if (score >= 15) { // Lowered threshold to get more results
        if (reasons.length === 0) {
          reasons.push('This product matches several aspects of your search');
        }
        if (matchedFeatures.length === 0) {
          matchedFeatures.push('Multiple relevant features');
        }

        recommendations.push({
          product,
          score: Math.min(score / 100, 1), // Normalize to 0-1 and cap at 1
          reasons,
          matchedFeatures
        });
      }
    }

    const sortedRecommendations = recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Return top 5 recommendations
    
    console.log(`Found ${sortedRecommendations.length} fallback recommendations`);
    if (sortedRecommendations.length === 0) {
      console.log(`Debug: Query "${query}" didn't match any products. Available categories:`, 
        [...new Set(PRODUCT_CATALOG.map(p => p.category))]);
    }
    return sortedRecommendations;
  }
}

// Export a singleton instance
export const aiService = AIService.getInstance();

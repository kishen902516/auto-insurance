interface QuoteSession {
  id: string;
  postcode?: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'in_progress' | 'completed';
}

interface CreateQuoteSessionRequest {
  postcode: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(response.status, `API request failed: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  throw lastError || new Error('Failed to fetch after retries');
}

export async function createQuoteSession(
  data: CreateQuoteSessionRequest
): Promise<QuoteSession> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/quote/session`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Failed to create quote session:', error);
    throw error;
  }
}

export async function updateQuoteSession(
  sessionId: string,
  data: Partial<QuoteSession>
): Promise<QuoteSession> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/quote/session/${sessionId}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Failed to update quote session:', error);
    throw error;
  }
}

export async function getQuoteSession(sessionId: string): Promise<QuoteSession> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/quote/session/${sessionId}`,
      {
        method: 'GET',
      }
    );

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Failed to get quote session:', error);
    throw error;
  }
}
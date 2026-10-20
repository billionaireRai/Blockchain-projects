
'use server'

type SearchMode = "EXACT" | "SEMANTIC" ;

type SearchCategories = "USER" | "WALLET" | "INVOICE" | "WORKSPACE" | "AUDITLOGS" | "TRANSACTION" | "RECONCILIATION" | "SEMANTIC" ; 

type SearchPlan = {
  searchMode: SearchMode ;
  entityType?: SearchCategories ;
  filters?: Record<string, unknown>;
  semanticQuery?: string;
}


import { pipeline } from "@huggingface/transformers" ;

const extractor = await pipeline("feature-extraction","Xenova/all-mpnet-base-v2");

export async function generateRecordsEmbedding(recordsText: string): Promise<number[]> {
  const output = await extractor(recordsText, { pooling: "mean", normalize: true });

  return Array.from(output.data);
}

export async function getVectorSearches() {
    
}

export function getSearchCategory(query: string): SearchPlan {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.startsWith("usr_")) {
    return {
      searchMode: "EXACT",
      entityType: "USER",
    };
  }

  if (normalizedQuery.startsWith("wal_")) {
    return {
      searchMode: "EXACT",
      entityType: "WALLET",
    };
  }

  if (normalizedQuery.startsWith("inv_")) {
    return {
      searchMode: "EXACT",
      entityType: "INVOICE",
    };
  }

  if (normalizedQuery.startsWith("wsp_")) {
    return {
      searchMode: "EXACT",
      entityType: "WORKSPACE",
    };
  }

  if (normalizedQuery.startsWith("aud_")) {
    return {
      searchMode: "EXACT",
      entityType: "AUDITLOGS",
    };
  }

  if (normalizedQuery.startsWith("txn_")) {
    return {
      searchMode: "EXACT",
      entityType: "TRANSACTION",
    };
  }

  if (normalizedQuery.startsWith("rec_")) {
    return {
      searchMode: "EXACT",
      entityType: "RECONCILIATION",
    };
  }

  return {
    searchMode: "SEMANTIC",
    entityType: "SEMANTIC",
    semanticQuery: normalizedQuery
  };
}
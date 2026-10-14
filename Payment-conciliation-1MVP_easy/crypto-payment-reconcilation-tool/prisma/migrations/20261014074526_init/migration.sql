CREATE EXTENSION IF NOT EXISTS vector;

-- CreateEnum
CREATE TYPE "NetworkEnvironment" AS ENUM ('MAINNET', 'TESTNET');

-- CreateEnum
CREATE TYPE "NetworkStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REVERTED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('TRANSFER', 'PAYMENT', 'REFUND', 'SWAP', 'DEPOSIT', 'WITHDRAWAL');

-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('PENDING', 'PAID', 'PARTIAL', 'OVERPAID', 'EXPIRED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "WalletStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "WalletRoles" AS ENUM ('DEPOSIT', 'PAYOUT', 'TREASURY', 'HOT', 'COLD');

-- CreateEnum
CREATE TYPE "NonceUses" AS ENUM ('WALLET_AUTHENTICATION', 'EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "NonceStatus" AS ENUM ('UNUSED', 'USED', 'EXPIRED', 'INVALID');

-- CreateEnum
CREATE TYPE "AuthMethods" AS ENUM ('WALLET', 'EMAIL');

-- CreateEnum
CREATE TYPE "ReconciliationStatus" AS ENUM ('PENDING', 'MATCHED', 'PARTIAL', 'MISMATCHED', 'EXCEPTION');

-- CreateEnum
CREATE TYPE "WorkspaceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "WorkspaceMemberRoles" AS ENUM ('OWNER', 'ADMIN', 'FINANCER', 'VIEWER');

-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('INVITED', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'REMOVED');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('NATIVE', 'TOKEN');

-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DEPRECATED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('LOGIN', 'LOGOUT', 'LOGIN_FAILED', 'PASSWORD_CHANGED', 'PASSWORD_RESET', 'MFA_ENABLED', 'MFA_DISABLED', 'WORKSPACE_CREATED', 'WORKSPACE_UPDATED', 'WORKSPACE_DELETED', 'WORKSPACE_SUSPENDED', 'WORKSPACE_REACTIVATED', 'MEMBER_INVITED', 'MEMBER_INVITATION_ACCEPTED', 'MEMBER_INVITATION_REVOKED', 'MEMBER_ROLE_UPDATED', 'MEMBER_SUSPENDED', 'MEMBER_REACTIVATED', 'MEMBER_REMOVED', 'WALLET_CREATED', 'WALLET_UPDATED', 'WALLET_DEACTIVATED', 'WALLET_ARCHIVED', 'NETWORK_CREATED', 'NETWORK_UPDATED', 'NETWORK_STATUS_CHANGED', 'ASSET_CREATED', 'ASSET_UPDATED', 'ASSET_STATUS_CHANGED', 'PAYMENT_CREATED', 'PAYMENT_UPDATED', 'PAYMENT_CONFIRMED', 'PAYMENT_FAILED', 'PAYMENT_EXPIRED', 'TRANSACTION_DETECTED', 'TRANSACTION_CONFIRMED', 'TRANSACTION_FAILED', 'RECONCILIATION_STARTED', 'RECONCILIATION_COMPLETED', 'RECONCILIATION_FAILED', 'DISCREPANCY_DETECTED', 'DISCREPANCY_RESOLVED', 'PAYOUT_CREATED', 'PAYOUT_APPROVED', 'PAYOUT_REJECTED', 'PAYOUT_PROCESSED', 'PAYOUT_FAILED', 'PAYOUT_CANCELLED', 'PERMISSION_DENIED', 'SETTINGS_UPDATED', 'SECURITY_ALERT', 'SUSPICIOUS_ACTIVITY_DETECTED', 'DATA_EXPORTED', 'MANUAL_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "AuditOutcome" AS ENUM ('SUCCESS', 'FAILURE', 'DENIED');

-- CreateEnum
CREATE TYPE "SearchEntityType" AS ENUM ('USER', 'WALLET', 'INVOICE', 'WORKSPACE', 'AUDITLOGS', 'TRANSACTION', 'RECONCILIATION', 'SEMANTIC');

-- CreateTable
CREATE TABLE "Transactions" (
    "recordId" TEXT NOT NULL DEFAULT 'txn_`${uuid()}`',
    "networkId" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "blockNumber" BIGINT,
    "blockHash" TEXT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "tokenAddress" TEXT,
    "tokenSymbol" TEXT NOT NULL,
    "tokenDecimals" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "gasUsed" TEXT,
    "gasPrice" TEXT,
    "type" "TransactionType" NOT NULL DEFAULT 'TRANSFER',
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "embedding" vector(768),
    "blockTimestamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "Invoices" (
    "recordId" TEXT NOT NULL DEFAULT 'inv_`${uuid()}`',
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "expectedAmount" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "networkId" TEXT NOT NULL,
    "tokenAddress" TEXT,
    "tokenSymbol" TEXT NOT NULL,
    "tokenDecimals" INTEGER NOT NULL,
    "status" "InvoiceType" NOT NULL DEFAULT 'PENDING',
    "expiry" TIMESTAMP(3) NOT NULL,
    "embedding" vector(768),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "Networks" (
    "recordId" TEXT NOT NULL DEFAULT 'net_`${uuid()}`',
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "environment" "NetworkEnvironment" NOT NULL,
    "status" "NetworkStatus" NOT NULL DEFAULT 'ACTIVE',
    "currencyName" TEXT NOT NULL,
    "currencySymbol" TEXT NOT NULL,
    "currencyDecimals" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Networks_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "Wallets" (
    "recordId" TEXT NOT NULL DEFAULT 'wal_`${uuid()}`',
    "workspaceId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "WalletStatus" NOT NULL DEFAULT 'ACTIVE',
    "label" TEXT NOT NULL,
    "walletRole" "WalletRoles" NOT NULL DEFAULT 'DEPOSIT',
    "networkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallets_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "Nonces" (
    "recordId" TEXT NOT NULL DEFAULT 'non_`${uuid()}`',
    "nonce" TEXT NOT NULL,
    "usedFor" "NonceUses" NOT NULL DEFAULT 'WALLET_AUTHENTICATION',
    "walletAdd" TEXT,
    "status" "NonceStatus" NOT NULL DEFAULT 'UNUSED',
    "expiry" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nonces_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "User" (
    "recordId" TEXT NOT NULL DEFAULT 'usr_`${uuid()}`',
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authMethod" "AuthMethods" NOT NULL DEFAULT 'EMAIL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "Reconciliations" (
    "recordId" TEXT NOT NULL DEFAULT 'rec_`${uuid()}`',
    "invoiceId" TEXT NOT NULL,
    "expectedAmount" TEXT NOT NULL,
    "recievedAmount" TEXT NOT NULL,
    "difference" TEXT NOT NULL DEFAULT '0',
    "status" "ReconciliationStatus" NOT NULL DEFAULT 'PENDING',
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "embedding" vector(768),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reconciliations_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "Workspaces" (
    "recordId" TEXT NOT NULL DEFAULT 'wsp_`${uuid()}`',
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "WorkspaceStatus" NOT NULL DEFAULT 'ACTIVE',
    "embedding" vector(1536),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspaces_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "WSmember" (
    "recordId" TEXT NOT NULL DEFAULT 'mem_`${uuid()}`',
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "WorkspaceMemberRoles" NOT NULL DEFAULT 'VIEWER',
    "status" "MemberStatus" NOT NULL DEFAULT 'INACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WSmember_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "Assets" (
    "recordId" TEXT NOT NULL DEFAULT 'ass_`${uuid()}`',
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "status" "AssetStatus" NOT NULL DEFAULT 'ACTIVE',
    "decimals" INTEGER NOT NULL,
    "contractAdd" TEXT,
    "networkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "Auditlogs" (
    "id" TEXT NOT NULL DEFAULT 'aud_`${uuid()}`',
    "action" "AuditAction" NOT NULL,
    "outcome" "AuditOutcome" NOT NULL,
    "actorId" TEXT,
    "workspaceId" TEXT,
    "targetType" TEXT,
    "targetId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "embedding" vector(768),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auditlogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Searchs" (
    "recordId" TEXT NOT NULL DEFAULT 'scr_`${uuid()}`',
    "userId" TEXT,
    "workspaceId" TEXT,
    "entityId" TEXT NOT NULL,
    "entityType" "SearchEntityType" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Searchs_pkey" PRIMARY KEY ("recordId")
);

-- CreateIndex
CREATE INDEX "Transactions_from_idx" ON "Transactions"("from");

-- CreateIndex
CREATE INDEX "Transactions_to_idx" ON "Transactions"("to");

-- CreateIndex
CREATE INDEX "Transactions_status_idx" ON "Transactions"("status");

-- CreateIndex
CREATE INDEX "Transactions_blockNumber_idx" ON "Transactions"("blockNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_txHash_key" ON "Transactions"("txHash");

-- CreateIndex
CREATE INDEX "Invoices_from_idx" ON "Invoices"("from");

-- CreateIndex
CREATE INDEX "Invoices_to_idx" ON "Invoices"("to");

-- CreateIndex
CREATE INDEX "Invoices_status_idx" ON "Invoices"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Networks_slug_key" ON "Networks"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Networks_chainId_environment_key" ON "Networks"("chainId", "environment");

-- CreateIndex
CREATE UNIQUE INDEX "Wallets_workspaceId_address_key" ON "Wallets"("workspaceId", "address");

-- CreateIndex
CREATE INDEX "Nonces_expiry_idx" ON "Nonces"("expiry");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_username_idx" ON "User"("email", "username");

-- CreateIndex
CREATE INDEX "Reconciliations_invoiceId_idx" ON "Reconciliations"("invoiceId");

-- CreateIndex
CREATE INDEX "Reconciliations_status_idx" ON "Reconciliations"("status");

-- CreateIndex
CREATE INDEX "Reconciliations_difference_idx" ON "Reconciliations"("difference");

-- CreateIndex
CREATE UNIQUE INDEX "Workspaces_name_key" ON "Workspaces"("name");

-- CreateIndex
CREATE INDEX "Workspaces_slug_idx" ON "Workspaces"("slug");

-- CreateIndex
CREATE INDEX "WSmember_workspaceId_status_idx" ON "WSmember"("workspaceId", "status");

-- CreateIndex
CREATE INDEX "WSmember_userId_status_idx" ON "WSmember"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "WSmember_workspaceId_userId_key" ON "WSmember"("workspaceId", "userId");

-- CreateIndex
CREATE INDEX "Assets_networkId_status_idx" ON "Assets"("networkId", "status");

-- CreateIndex
CREATE INDEX "Assets_symbol_idx" ON "Assets"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Assets_networkId_slug_key" ON "Assets"("networkId", "slug");

-- CreateIndex
CREATE INDEX "Auditlogs_workspaceId_createdAt_idx" ON "Auditlogs"("workspaceId", "createdAt");

-- CreateIndex
CREATE INDEX "Auditlogs_actorId_createdAt_idx" ON "Auditlogs"("actorId", "createdAt");

-- CreateIndex
CREATE INDEX "Auditlogs_action_createdAt_idx" ON "Auditlogs"("action", "createdAt");

-- CreateIndex
CREATE INDEX "Searchs_workspaceId_entityType_idx" ON "Searchs"("workspaceId", "entityType");

-- CreateIndex
CREATE INDEX "Searchs_entityType_entityId_idx" ON "Searchs"("entityType", "entityId");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Networks"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspaces"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Networks"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallets" ADD CONSTRAINT "Wallets_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Networks"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reconciliations" ADD CONSTRAINT "Reconciliations_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoices"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WSmember" ADD CONSTRAINT "WSmember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspaces"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WSmember" ADD CONSTRAINT "WSmember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Networks"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auditlogs" ADD CONSTRAINT "Auditlogs_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("recordId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auditlogs" ADD CONSTRAINT "Auditlogs_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspaces"("recordId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Searchs" ADD CONSTRAINT "Searchs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("recordId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Searchs" ADD CONSTRAINT "Searchs_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspaces"("recordId") ON DELETE SET NULL ON UPDATE CASCADE;

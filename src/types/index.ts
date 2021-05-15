export type statuses = 'pending' | 'active' | 'inactive' | 'removed'

export type transactionStatuses = statuses | 'canceled' | 'rejected'

export type types = 'customer' | 'account' | 'product' | 'transaction' | 'contact'

export type accountTypes = 'checking' | 'saving'
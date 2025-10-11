import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Stack,
  Typography,
  TextInput,
  Divider
} from "@strapi/design-system";
import { Search } from "@strapi/icons";
import StatusBadge from "./StatusBadge";
import { formatTransactionData } from "./formatTransactionData";

const HistoryPanel = ({
  filters,
  onFilterChange,
  onFilterApply,
  isLoadingHistory,
  transactionHistory,
  paginatedTransactions,
  currentPage,
  totalPages,
  pageSize,
  onRefresh,
  onPageChange,
  selectedTransaction,
  onTransactionSelect
}) => {
  return (
    <Box
      hasRadius
      shadow="filterShadow"
      paddingTop={8}
      paddingBottom={8}
      paddingLeft={8}
      paddingRight={8}
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid #f6f6f9"
      }}
    >
      <Flex direction="column" alignItems="stretch" gap={8}>
        <Typography variant="beta" as="h2" marginBottom={2}>
          Transaction Management
        </Typography>

        {/* Filters */}
        <Box>
          <Box marginBottom={4}>
            <Typography variant="delta" as="h3" fontWeight="bold">
              Transaction Filters
            </Typography>
            <Typography variant="pi" textColor="neutral600" marginTop={2}>
              Filter transactions by status, type, date range, and more
            </Typography>
          </Box>
          <Card style={{ borderRadius: "8px", border: "1px solid #e4e2e7" }}>
            <CardBody padding={6}>
              <Stack spacing={4}>
                <Flex gap={4} wrap="wrap" alignItems="center">
                  <TextInput
                    label="Status"
                    name="status"
                    value={filters.status}
                    onChange={(e) => onFilterChange("status", e.target.value)}
                    placeholder="APPROVED, ERROR, etc."
                    style={{ flex: 1, minWidth: "200px" }}
                  />
                  <TextInput
                    label="Request Type"
                    name="request_type"
                    value={filters.request_type}
                    onChange={(e) =>
                      onFilterChange("request_type", e.target.value)
                    }
                    placeholder="preauthorization, authorization, etc."
                    style={{ flex: 1, minWidth: "200px" }}
                  />
                  <TextInput
                    label="Transaction ID"
                    name="txid"
                    value={filters.txid}
                    onChange={(e) => onFilterChange("txid", e.target.value)}
                    placeholder="Enter TxId"
                    style={{ flex: 1, minWidth: "200px" }}
                  />
                  <TextInput
                    label="Reference"
                    name="reference"
                    value={filters.reference}
                    onChange={(e) =>
                      onFilterChange("reference", e.target.value)
                    }
                    placeholder="Enter reference"
                    style={{ flex: 1, minWidth: "200px" }}
                  />
                  <TextInput
                    label="Date From"
                    name="date_from"
                    value={filters.date_from}
                    onChange={(e) =>
                      onFilterChange("date_from", e.target.value)
                    }
                    placeholder="YYYY-MM-DD"
                    type="date"
                    style={{ flex: 1, minWidth: "200px" }}
                  />
                  <TextInput
                    label="Date To"
                    name="date_to"
                    value={filters.date_to}
                    onChange={(e) => onFilterChange("date_to", e.target.value)}
                    placeholder="YYYY-MM-DD"
                    type="date"
                    style={{ flex: 1, minWidth: "200px" }}
                  />
                  <Button
                    variant="default"
                    onClick={onFilterApply}
                    loading={isLoadingHistory}
                    startIcon={<Search />}
                  >
                    Apply Filters
                  </Button>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
        </Box>

        <Divider />

        {/* Transaction History */}
        <Box>
          <Box marginBottom={6}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              marginBottom={4}
            >
              <Box>
                <Typography variant="delta" as="h3" fontWeight="bold">
                  Transaction History
                </Typography>
                <Typography variant="pi" textColor="neutral600" marginTop={2}>
                  {transactionHistory.length} total transactions •{" "}
                  {paginatedTransactions.length} on page {currentPage} of{" "}
                  {totalPages}
                </Typography>
              </Box>
              <Button
                variant="default"
                onClick={onRefresh}
                loading={isLoadingHistory}
                startIcon={<Search />}
                size="S"
                style={{
                  background: "#28a745",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "8px"
                }}
              >
                Refresh
              </Button>
            </Flex>
          </Box>

          {isLoadingHistory ? (
            <Box padding={4} textAlign="center">
              <Typography>Loading transactions...</Typography>
            </Box>
          ) : transactionHistory.length === 0 ? (
            <Box padding={4} textAlign="center">
              <Typography textColor="neutral600">
                No transactions found
              </Typography>
            </Box>
          ) : (
            <Box>
              {paginatedTransactions.map((transaction) => (
                <Box key={transaction.id}>
                  <Card
                    style={{
                      marginBottom: "8px",
                      cursor: "pointer",
                      border:
                        selectedTransaction?.id === transaction.id
                          ? "2px solid #4945ff"
                          : "1px solid #e4e2e7",
                      transition: "all 0.2s ease"
                    }}
                    onClick={() => onTransactionSelect(transaction)}
                  >
                    <CardBody padding={4}>
                      <Flex
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Box style={{ flex: 1 }}>
                          <Flex alignItems="center" gap={2} marginBottom={3}>
                            <Typography
                              variant="pi"
                              fontWeight="bold"
                              textColor="neutral800"
                            >
                              {transaction.request_type?.toUpperCase() ||
                                "UNKNOWN"}
                            </Typography>
                            <StatusBadge status={transaction.status} />
                          </Flex>

                          <Stack spacing={2}>
                            {(transaction.txid ||
                              transaction.TxId ||
                              transaction.tx_id ||
                              transaction.transactionid ||
                              transaction.transaction_id ||
                              transaction.id) && (
                              <Flex alignItems="center" gap={2}>
                                <Typography
                                  variant="pi"
                                  textColor="neutral600"
                                  style={{ minWidth: "60px" }}
                                >
                                  TxId:
                                </Typography>
                                <Typography variant="pi" fontWeight="medium">
                                  {transaction.txid ||
                                    transaction.TxId ||
                                    transaction.tx_id ||
                                    transaction.transactionid ||
                                    transaction.transaction_id ||
                                    transaction.id}
                                </Typography>
                              </Flex>
                            )}

                            {transaction.reference && (
                              <Flex alignItems="center" gap={2}>
                                <Typography
                                  variant="pi"
                                  textColor="neutral600"
                                  style={{ minWidth: "60px" }}
                                >
                                  Ref:
                                </Typography>
                                <Typography variant="pi" fontWeight="medium">
                                  {transaction.reference}
                                </Typography>
                              </Flex>
                            )}

                            {transaction.amount && (
                              <Flex alignItems="center" gap={2}>
                                <Typography
                                  variant="pi"
                                  textColor="neutral600"
                                  style={{ minWidth: "60px" }}
                                >
                                  Amount:
                                </Typography>
                                <Typography variant="pi" fontWeight="medium">
                                  {transaction.amount} {transaction.currency}
                                </Typography>
                              </Flex>
                            )}

                            <Flex alignItems="center" gap={2}>
                              <Typography
                                variant="pi"
                                textColor="neutral600"
                                style={{ minWidth: "60px" }}
                              >
                                Date:
                              </Typography>
                              <Typography variant="pi" fontWeight="medium">
                                {new Date(
                                  transaction.timestamp
                                ).toLocaleString()}
                              </Typography>
                            </Flex>
                          </Stack>
                        </Box>
                      </Flex>
                    </CardBody>
                  </Card>

                  {/* Transaction Details - Show right after selected transaction */}
                  {selectedTransaction?.id === transaction.id && (
                    <Card>
                      <CardBody padding={4}>
                        <Stack spacing={3}>
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant="pi"
                              fontWeight="bold"
                              textColor="neutral800"
                            >
                              Transaction Details
                            </Typography>
                            <Button
                              variant="tertiary"
                              size="S"
                              onClick={() => onTransactionSelect(null)}
                            >
                              Close
                            </Button>
                          </Flex>

                          <Divider />

                          <Box>
                            <Stack spacing={2}>
                              {formatTransactionData(selectedTransaction)
                                .slice(0, 8)
                                .map((item, index) => (
                                  <Flex
                                    key={index}
                                    justifyContent="space-between"
                                    alignItems="start"
                                    padding={2}
                                  >
                                    <Typography
                                      variant="pi"
                                      textColor="neutral700"
                                      fontWeight="medium"
                                      style={{ minWidth: "150px" }}
                                    >
                                      {item.key}:
                                    </Typography>
                                    <Typography
                                      variant="pi"
                                      textColor="neutral800"
                                      style={{
                                        flex: 1,
                                        textAlign: "right",
                                        wordBreak: "break-word",
                                        maxWidth: "60%"
                                      }}
                                    >
                                      {item.value}
                                    </Typography>
                                  </Flex>
                                ))}
                            </Stack>
                          </Box>

                          {formatTransactionData(selectedTransaction).length >
                            8 && (
                            <Box paddingTop={2}>
                              <Typography
                                variant="pi"
                                textColor="neutral600"
                                fontStyle="italic"
                              >
                                Showing first 8 fields. Full data available in
                                transaction history.
                              </Typography>
                            </Box>
                          )}
                        </Stack>
                      </CardBody>
                    </Card>
                  )}
                </Box>
              ))}

              {/* Pagination */}
              <Box paddingTop={6} paddingBottom={4}>
                <Card
                  style={{ borderRadius: "8px", border: "1px solid #e4e2e7" }}
                >
                  <CardBody padding={4}>
                    <Flex justifyContent="space-between" alignItems="center">
                      {transactionHistory.length > pageSize &&
                      totalPages > 1 ? (
                        <Flex gap={3} alignItems="center">
                          <Button
                            variant="default"
                            size="S"
                            onClick={() =>
                              onPageChange(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            style={{
                              background:
                                currentPage === 1 ? "#f6f6f9" : "#28a745",
                              border: "none",
                              color: currentPage === 1 ? "#666687" : "white",
                              fontWeight: "600",
                              borderRadius: "6px"
                            }}
                          >
                            ← Previous
                          </Button>

                          <Box
                            padding={2}
                            background="#f6f6f9"
                            borderRadius="6px"
                          >
                            <Typography
                              variant="pi"
                              textColor="neutral600"
                              fontWeight="bold"
                            >
                              Page {currentPage} of {totalPages}
                            </Typography>
                          </Box>

                          <Button
                            variant="default"
                            size="S"
                            onClick={() =>
                              onPageChange(
                                Math.min(totalPages, currentPage + 1)
                              )
                            }
                            disabled={currentPage === totalPages}
                            style={{
                              background:
                                currentPage === totalPages
                                  ? "#f6f6f9"
                                  : "#28a745",
                              border: "none",
                              color:
                                currentPage === totalPages
                                  ? "#666687"
                                  : "white",
                              fontWeight: "600",
                              borderRadius: "6px"
                            }}
                          >
                            Next →
                          </Button>
                        </Flex>
                      ) : (
                        <Typography
                          variant="pi"
                          textColor="neutral600"
                          fontWeight="medium"
                        >
                          {transactionHistory.length <= pageSize
                            ? "All transactions shown"
                            : "No pagination needed"}
                        </Typography>
                      )}
                    </Flex>
                  </CardBody>
                </Card>
                <Typography
                  variant="pi"
                  textColor="neutral600"
                  fontWeight="medium"
                >
                  Showing {paginatedTransactions.length} of{" "}
                  {transactionHistory.length} transactions
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box paddingTop={4}>
          <Typography variant="sigma" textColor="neutral600">
            Note: This shows all Payone transactions processed through this
            plugin. Transactions are automatically logged with detailed
            request/response data.
          </Typography>
        </Box>
      </Flex>
    </Box>
  );
};

export default HistoryPanel;

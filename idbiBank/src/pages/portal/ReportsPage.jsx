import { useEffect, useMemo, useState } from 'react'

const monthlyOptions = [
  'Last month report',
  'Last three months report',
  'Last 6 months report',
  'Last 9 months report',
  'Last 12 months report',
]

const reportRows = [
  { id: 1, transactionId: 'TXN20260001', amount: '10,000', date: '24/02/2026, 12:23 PM', status: 'Received' },
  { id: 2, transactionId: 'TXN20260002', amount: '12,500', date: '24/02/2026, 01:14 PM', status: 'Received' },
  { id: 3, transactionId: 'TXN20260003', amount: '8,900', date: '25/02/2026, 09:42 AM', status: 'Pending' },
  { id: 4, transactionId: 'TXN20260004', amount: '15,200', date: '25/02/2026, 03:11 PM', status: 'Received' },
  { id: 5, transactionId: 'TXN20260005', amount: '18,000', date: '26/02/2026, 10:18 AM', status: 'Failed' },
  { id: 6, transactionId: 'TXN20260006', amount: '11,400', date: '26/02/2026, 05:36 PM', status: 'Received' },
  { id: 7, transactionId: 'TXN20260007', amount: '7,250', date: '27/02/2026, 08:20 AM', status: 'Pending' },
  { id: 8, transactionId: 'TXN20260008', amount: '9,875', date: '27/02/2026, 11:09 AM', status: 'Received' },
  { id: 9, transactionId: 'TXN20260009', amount: '14,650', date: '27/02/2026, 04:55 PM', status: 'Received' },
  { id: 10, transactionId: 'TXN20260010', amount: '6,300', date: '28/02/2026, 09:10 AM', status: 'Failed' },
  { id: 11, transactionId: 'TXN20260011', amount: '13,999', date: '28/02/2026, 02:47 PM', status: 'Received' },
  { id: 12, transactionId: 'TXN20260012', amount: '10,750', date: '01/03/2026, 10:02 AM', status: 'Pending' },
  { id: 13, transactionId: 'TXN20260013', amount: '16,100', date: '01/03/2026, 01:31 PM', status: 'Received' },
  { id: 14, transactionId: 'TXN20260014', amount: '9,300', date: '01/03/2026, 05:40 PM', status: 'Received' },
  { id: 15, transactionId: 'TXN20260015', amount: '20,000', date: '02/03/2026, 09:25 AM', status: 'Received' },
  { id: 16, transactionId: 'TXN20260016', amount: '5,800', date: '02/03/2026, 12:16 PM', status: 'Pending' },
  { id: 17, transactionId: 'TXN20260017', amount: '7,990', date: '02/03/2026, 04:04 PM', status: 'Received' },
  { id: 18, transactionId: 'TXN20260018', amount: '13,250', date: '03/03/2026, 08:48 AM', status: 'Received' },
  { id: 19, transactionId: 'TXN20260019', amount: '17,450', date: '03/03/2026, 11:52 AM', status: 'Failed' },
  { id: 20, transactionId: 'TXN20260020', amount: '12,000', date: '03/03/2026, 03:27 PM', status: 'Received' },
  { id: 21, transactionId: 'TXN20260021', amount: '8,450', date: '04/03/2026, 10:08 AM', status: 'Pending' },
  { id: 22, transactionId: 'TXN20260022', amount: '19,999', date: '04/03/2026, 01:20 PM', status: 'Received' },
  { id: 23, transactionId: 'TXN20260023', amount: '10,600', date: '04/03/2026, 05:15 PM', status: 'Received' },
  { id: 24, transactionId: 'TXN20260024', amount: '11,250', date: '05/03/2026, 09:39 AM', status: 'Failed' },
]

function getStatusClass(status) {
  if (status === 'Received') return 'reports-table__status reports-table__status--received'
  if (status === 'Pending') return 'reports-table__status reports-table__status--pending'
  return 'reports-table__status reports-table__status--failed'
}

export function ReportsPage() {
  const [filterType, setFilterType] = useState('custom')
  const [searchValue, setSearchValue] = useState('')
  const [monthlySelection, setMonthlySelection] = useState(monthlyOptions[0])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [goToPageInput, setGoToPageInput] = useState('1')

  const filteredRows = useMemo(() => {
    const term = searchValue.trim().toLowerCase()

    if (!term) {
      return reportRows
    }

    return reportRows.filter((row) =>
      [String(row.id), row.transactionId, row.amount, row.date, row.status].some((value) =>
        value.toLowerCase().includes(term),
      ),
    )
  }, [searchValue])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage))

  useEffect(() => {
    setCurrentPage(1)
  }, [searchValue, rowsPerPage])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
      return
    }

    setGoToPageInput(String(currentPage))
  }, [currentPage, totalPages])

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredRows.slice(startIndex, startIndex + rowsPerPage)
  }, [currentPage, filteredRows, rowsPerPage])

  const paginationItems = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 'ellipsis', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, 'ellipsis-left', currentPage, 'ellipsis-right', totalPages]
  }, [currentPage, totalPages])

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return
    }

    setCurrentPage(page)
  }

  const handleGoToPageBlur = () => {
    const nextPage = Number(goToPageInput)

    if (Number.isNaN(nextPage)) {
      setGoToPageInput(String(currentPage))
      return
    }

    handlePageChange(nextPage)
  }

  return (
    <section className="portal-section reports-page">
      <h1 className="portal-section__title">Transaction Reports</h1>

      <div className="reports-filter-card">
        <p className="reports-filter-card__label">Select a Report Filter</p>

        <div className="reports-filter-card__options">
          <label className="reports-radio">
            <input
              checked={filterType === 'today'}
              name="report-filter"
              type="radio"
              onChange={() => setFilterType('today')}
            />
            <span>Today</span>
          </label>

          <label className="reports-radio">
            <input
              checked={filterType === 'monthly'}
              name="report-filter"
              type="radio"
              onChange={() => setFilterType('monthly')}
            />
            <span>Monthly</span>
          </label>

          <label className="reports-radio">
            <input
              checked={filterType === 'custom'}
              name="report-filter"
              type="radio"
              onChange={() => setFilterType('custom')}
            />
            <span>Custom Range</span>
          </label>
        </div>

        {filterType !== 'today' ? (
          <div className="reports-filter-card__controls">
            {filterType === 'monthly' ? (
              <label className="reports-input-group reports-input-group--wide">
                <span>Monthly Range</span>
                <select
                  value={monthlySelection}
                  onChange={(event) => setMonthlySelection(event.target.value)}
                >
                  {monthlyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <>
                <label className="reports-input-group">
                  <span>Start Date</span>
                  <input type="date" />
                </label>

                <label className="reports-input-group">
                  <span>End Date</span>
                  <input type="date" />
                </label>
              </>
            )}

            <button className="reports-action-button" type="button">
              Submit
            </button>
          </div>
        ) : null}
      </div>

      <div className="reports-table-card">
        <div className="reports-table-card__toolbar">
          <label className="reports-search">
            <input
              type="search"
              placeholder="Search here..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </label>

          <button className="reports-action-button reports-action-button--small" type="button">
            Download All
          </button>
        </div>

        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.transactionId}</td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                  <td className={getStatusClass(row.status)}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="reports-table-card__footer">
          <div className="reports-table-card__meta">
            <span>Row per page</span>
            <select
              value={rowsPerPage}
              onChange={(event) => setRowsPerPage(Number(event.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <span>Go to</span>
            <input
              type="text"
              value={goToPageInput}
              onChange={(event) => setGoToPageInput(event.target.value)}
              onBlur={handleGoToPageBlur}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleGoToPageBlur()
                }
              }}
            />
          </div>

          <div className="reports-pagination">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {paginationItems.map((item, index) =>
              typeof item === 'number' ? (
                <button
                  key={`${item}-${index}`}
                  className={item === currentPage ? 'is-active' : ''}
                  type="button"
                  onClick={() => handlePageChange(item)}
                >
                  {item}
                </button>
              ) : (
                <span key={`${item}-${index}`}>...</span>
              ),
            )}

            <button
              type="button"
              aria-label="Next page"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

let statusMapping = {
  0: 'Applying',
  1: 'Approved',
  2: 'Rejected'
}
const status = (status) => {
  return statusMapping[status] || 'Unknown'
}

export default status

module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
  },
  {
    type: 'tree',
    icon: 'fa fa-home',
    name: 'Home'
  },
  {
    type: 'tree',
    icon: 'fa fa-cubes',
    name: 'DFIS',
    items: [
      {
        type: 'item',
        icon: 'fa fa-dashboard',
        name: 'Dashboard',
        router: {
          name: 'Dashboard'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-cube',
        name: 'Group',
        router: {
          name: 'Group'
        }
      }
    ]
  }
]

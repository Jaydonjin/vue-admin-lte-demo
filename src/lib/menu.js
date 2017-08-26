module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
  },
  {
    type: 'item',
    icon: 'fa fa-home',
    name: 'Home',
    router: {
      name: 'Home'
    }
  },
  {
    type: 'tree',
    icon: 'fa fa-cubes',
    name: 'DFIS',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o text-green',
        name: 'Dashboard',
        router: {
          name: 'Dashboard'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o text-green',
        name: 'Groups',
        router: {
          name: 'Groups'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o text-green',
        name: 'Demo',
        router: {
          name: 'Demo'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o text-green',
        name: 'Requests',
        router: {
          name: 'GroupRequests'
        }
      }
    ]
  }
]

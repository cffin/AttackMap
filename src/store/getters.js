const getters = {
  // Breadcrumbs
  getBreadcrumbs: state => state.breadcrumbs.items,
  // Notifications
  getItems: state => state.notifications.items,
  getShowBadge: state => state.notifications.showBadge,
  // ResponseMessage 
  getAlert: state => ({
    show: state.responseMessage.alert.show,
    type: state.responseMessage.alert.type,
    text: state.responseMessage.alert.text
  })

}
export default getters
const actionTypes = {
  saveData: 'orderHistory/SAVE_DATA',
}

export function saveData(data: any) {
  return {
    type: actionTypes.saveData,
    payload: { data },
  }
}

export default actionTypes

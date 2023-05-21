import constant from "./constant"

function fetchDisabledFields() {
    const disabledField = {
        title: false,
        assignee: false,
        status: false,
        description: false,
        priority: false
    }

    const userType = localStorage.getItem(constant.userAttributeFields.userType);

    if (userType === constant.userTypes.engineer) {
        disabledField.title = true;
        disabledField.assignee = true;
        disabledField.priority = true;
    } else if (userType === constant.userTypes.admin) {
        disabledField.title = true;
    } else if (userType === constant.userTypes.customer) {
        disabledField.assignee = true;
    }


    console.log(userType);

    return disabledField;

}

export default fetchDisabledFields


import { faker } from "@faker-js/faker";
export default (user,count,userNameIds,userMailAddressIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
machineID: faker.lorem.sentence("8"),
userName: userNameIds[i % userNameIds.length],
userMailAddress: userMailAddressIds[i % userMailAddressIds.length],
location: faker.lorem.sentence("8"),
ticketIssue: faker.lorem.sentence("8"),
ticketStatus: faker.lorem.sentence(""),
userCheckList: faker.lorem.sentence("8"),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};

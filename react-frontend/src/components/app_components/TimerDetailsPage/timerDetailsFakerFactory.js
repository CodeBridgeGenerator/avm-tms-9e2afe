
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
serviceName: faker.lorem.sentence(""),
staffId: faker.lorem.sentence(""),
startTime: faker.lorem.sentence(""),
endTime: faker.lorem.sentence(""),
timerStatus: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};

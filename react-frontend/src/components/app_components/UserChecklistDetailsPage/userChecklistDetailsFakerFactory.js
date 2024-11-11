
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
checkListName: faker.lorem.sentence(""),
checkListDescription: faker.lorem.sentence(""),
checkListItems: faker.lorem.sentence(1),
checkListOrder: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};

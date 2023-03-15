class CollaboratorCallException extends Error {}
class UserSession {
    public static getLoggedUser(): User {
        throw new CollaboratorCallException(
            "UserSession.getLoggedUser() should not be called in an unit test"
        );
    }
}
class Trip {}

class User {
    private trips: Trip[] = [];
    private friends: User[] = [];

    public getFriends(): User[] {
        return this.friends;
    }

    public addFriend(user: User): void {
        this.friends.push(user);
    }

    public addTrip(trip: Trip): void {
        this.trips.push(trip);
    }

    public getTrips(): Trip[] {
        return this.trips;
    }
}
export default class TripDAO {
    public static findTripsByUser(user: User): Trip[] {
        throw new CollaboratorCallException(
            "TripDAO should not be invoked on an unit test."
        );
    }
}
class UserNotLoggedInException extends Error {}
const throwUserNotLoggedIn = () => {
    throw new UserNotLoggedInException();
};
class TripService {
    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser: User = UserSession.getLoggedUser();
        let isFriend: boolean = false;

        if (loggedUser != null) {
            for (const friend of user.getFriends()) {
                if (friend === loggedUser) {
                    isFriend = true;
                    break;
                }
            }

            if (isFriend) {
                tripList = TripDAO.findTripsByUser(user);
            }

            return tripList;
        } else {
            throwUserNotLoggedIn();
            throw new UserNotLoggedInException();
        }
    }
}

import { stub } from "sinon";

console.log("test 1");
const service = new TripService();
stub(UserSession, "getLoggedUser");
stub(TripDAO, "findTripsByUser");
try {
    service.getTripsByUser(null);
} catch (e) {
    console.log(e.constructor.name);
}
UserSession.getLoggedUser.restore();

console.log("test 2");
stub(UserSession, "getLoggedUser").callsFake(() => new User());
console.log(service.getTripsByUser(new User()));
UserSession.getLoggedUser.restore();

console.log("test 3");
{
    const u = new User();
    const f = new User();
    u.addFriend(f);
    f.addFriend(u);
    stub(UserSession, "getLoggedUser").callsFake(() => u);
    console.log(service.getTripsByUser(f));
    UserSession.getLoggedUser.restore();
}
console.log("test 3");
{
    const u = new User();
    const f = new User();
    u.addFriend(f);
    f.addFriend(u);
    stub(UserSession, "getLoggedUser").callsFake(() => u);
    console.log(service.getTripsByUser(u));
    UserSession.getLoggedUser.restore();
}

console.log("test 4");
{
    const u = new User();
    const f = new User();
    u.addFriend(f);
    u.addTrip(new Trip());
    f.addFriend(u);
    f.addTrip(new Trip());

    stub(TripDAO, "findTripsByUser");
    stub(UserSession, "getLoggedUser").callsFake(() => u);
    console.log(service.getTripsByUser(u));
    console.log(u.getTrips());
    console.log(f.getTrips());
    UserSession.getLoggedUser.restore();
}

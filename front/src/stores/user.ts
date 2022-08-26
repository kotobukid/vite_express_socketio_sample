import {defineStore} from "pinia";
import {User} from "../../../types";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            users: [] as User[],
        }
    },
    getters: {
        // users(state): User[] {
        //     return state.members;
        // }
        users_over_18(state): User[] {
            return state.users.filter(u => u.age > 18)
        }
    },
    actions: {
        replaceUsers(users: User[]) {
            // ここのthis.usersは、gettersにusersを定義していた場合、constまたはreadonlyプロパティへの代入扱いとなりエラー
            // 　stateのプロパティを同名のまま返すgetterは定義しない流儀か
            this.users = users;
        },
        appendUser(user: User) {
            this.users = [...this.users, user];
        }
    }
})
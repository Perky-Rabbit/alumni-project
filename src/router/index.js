import {
    createMemoryHistory,
    createRouter as _createRouter,
    createWebHistory,
} from "vue-router";

// import { createRouter, createWebHistory } from "vue-router";
import Cookies from 'js-cookie';
import axios from 'axios'

const routes = [
  // Alumni Home routes
  {
    path: "/home",
    component: () => import("../components/AuthAndHome/Layout.vue"),
    meta: {
      requiresGuest: true
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/Home/Index.vue"),
      },

      {
        path: "/alumni-list",
        name: "alumniList",
        component: () => import("../views/Home/AlumniList/Index.vue"),
      },

      {
        path: "/news",
        name: "news",
        component: () => import("../views/Home/News/All.vue"),
      },

      {
        path: "/",
        component: () => import("../views/Home/News/Layouts.vue"),
        
        children: [
          {
            path: '/news/:slug',
            component: () => import("../views/Home/News/Single.vue"),
          },
        ],
      },

      {
        path: "/notice-event",
        name: "notice-event",
        component: () => import("../views/Home/Event/All.vue"),
      },

      {
        path: "/",
        component: () => import("../views/Home/Event/Layouts.vue"),
        
        children: [
          {
            path: '/notice-event/:slug',
            component: () => import("../views/Home/Event/Single.vue"),
          },
        ],
      },
    ],
  },

  // Alumni Auth routes
  {
    path: "/",
    component: () => import("../components/AuthAndHome/Layout.vue"),
    meta: {
      requiresGuest: true
    },
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/Auth/Login.vue"),
      },
      
      {
        path: "/register",
        name: "register",
        component: () => import("../views/Auth/Register.vue"),
      },

      {
        path: "/forgot-password",
        name: "forgotPassword",
        component: () => import("../views/Auth/ForgotPassword.vue"),
      },

      {
        path: "/reset-password",
        name: "resetPassword",
        component: () => import("../views/Auth/ResetPassword.vue"),
      },
    ],
  },

  // Alumni Dashboard routes
  {
    path: "/",
    component: () => import("../components/Dashboard/Layout.vue"),
    meta:{
      requiresAuth: true
    },
    children: [
      // dashboard home routes
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/Dashboard/Index.vue"),
      },

      // dashboard member routes
      {
        path: "member",
        name: "member",
        component: () => import("../views/Dashboard/Member/Members.vue"),
      },

      // dashboard message routes
      {
        path: "messages",
        name: "messages",
        component: () => import("../views/Dashboard/Messages.vue"),
      },

      // dashboard profile routes
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/Dashboard/Profile/Profile.vue"),
      },

      {
        path: "activity",
        name: "activity",
        component: () => import("../views/Dashboard/Profile/Activity.vue"),
      },

      {
        path: "skills",
        name: "skills",
        component: () => import("../views/Dashboard/Profile/Skill.vue"),
      },

      {
        path: "achievements",
        name: "achievements",
        component: () => import("../views/Dashboard/Profile/Achievement.vue"),
      },

      // dashboard another profile routes
      {
        path: "/another-profile",
        // path: "/another-profile/:username/:id",
        name: "AnotherProfile",
        component: () => import("../views/Dashboard/AnotherProfile/AnotherProfile.vue"),
      },

      {
        path: "/another-profile-mutual-friends",
        name: "AnotherProfileMutualFriends",
        component: () => import("../views/Dashboard/AnotherProfile/AnotherProfileMutualFriends.vue"),
      },

      {
        path: "/another-profile-skills",
        name: "AnotherProfileSkills",
        component: () => import("../views/Dashboard/AnotherProfile/AnotherProfileSkills.vue"),
      },

      {
        path: "/another-profile-achievements",
        name: "AnotherProfileAchievements",
        component: () => import("../views/Dashboard/AnotherProfile/AnotherProfileAchievements.vue"),
      },

      // dashboard my network routes
      {
        path: "/",
        component: () => import("../views/Dashboard/Network/Layout.vue"),

        children: [
          {
            path: "/my-network",
            name: "MyNetwork",
            component: () => import("../views/Dashboard/Network/MyNetwork.vue"),
          },

          {
            path: "connection",
            name: "connection",
            component: () => import("../views/Dashboard/Network/Connection.vue"),
          },

          {
            path: "pending-friend-request",
            name: "pendingFriendRrequest",
            component: () => import("../views/Dashboard/Network/PendingFriendRequest.vue"),
          },

          {
            path: "invitation",
            name: "invitation",
            component: () => import("../views/Dashboard/Network/Invitation.vue"),
          },

          {
            path: "invite-others",
            name: "invite_others",
            component: () => import("../views/Dashboard/Network/InviteOthers.vue"),
          },

          {
            path: "block-list",
            name: "blockList",
            component: () => import("../views/Dashboard/Network/BlockList.vue"),
          },

          {
            path: "following-followers",
            name: "followingFollowers",
            component: () =>
              import("../views/Dashboard/Network/FollowingFollowers.vue"),
          },

          {
            path: "group",
            name: "group",
            component: () => import("../views/Dashboard/Network/Group.vue"),
          },

          {
            path: "class-memories",
            name: "classMemories",
            component: () => import("../views/Dashboard/Network/ClassMemories.vue"),
          },

          {
            path: "chapter",
            name: "chapter",
            component: () => import("../views/Dashboard/Network/Chapter.vue"),
          },

          {
            path: "event",
            name: "event",
            component: () => import("../views/Dashboard/Network/Event.vue"),
          },

          {
            path: "fund-event",
            name: "fund-event",
            component: () => import("../views/Dashboard/Network/FundEvent.vue"),
          },
        ],
      },

      // dashboard group route
      {
        path: "group-view",
        name: "groupView",
        component: () => import("../views/Dashboard/Group/Index.vue"),
      },

      {
        path: "group-member",
        name: "groupMember",
        component: () => import("../views/Dashboard/Group/Member.vue"),
      },

      // dashboard chapter route
      {
        path: "chapter-view",
        name: "chapterView",
        component: () => import("../views/Dashboard/Chapter/Index.vue"),
      },

      {
        path: "chapter-member",
        name: "chapterMember",
        component: () => import("../views/Dashboard/Chapter/Member.vue"),
      },

      // dashboard event route
      {
        path: "event-view",
        name: "eventView",
        component: () => import("../views/Dashboard/Event/Index.vue"),
      },

      // dashboard single-fund-event route
      {
        path: "single-fund-event",
        name: "singleFundEvent",
        component: () => import("../views/Dashboard/FundEvent/single.vue"),
      },

      // dashboard class memories route
      {
        path: "class-memories-view",
        name: "classMemoriesView",
        component: () => import("../views/Dashboard/ClassMemories/Index.vue"),
      },

      // dashboard account related routes
      {
        path: "/account-setting",
        component: () => import("../views/Dashboard/Account/Layout.vue"),

        children: [
          {
            path: "/account-preferences",
            name: "account_preferences",
            component: () => import("../views/Dashboard/Account/AccountPreferences.vue"),
          },
          {
            path: "/signin-security",
            name: "signin_security",
            component: () => import("../views/Dashboard/Account/SigninSecurity.vue"),
          },
          {
            path: "/2fa",
            name: "2fa",
            component: () => import("../views/Dashboard/Account/2fa.vue"),
          },
        ],
      },
    ],
  },
];

export const createRouter = () => {
  const router = _createRouter({
      history: import.meta.env.SSR
      ? createMemoryHistory("/")
      : createWebHistory("/"),
      routes,
  });

  router.beforeEach((to, from, next) => {
  const isAlumniAuthenticated = !!Cookies.get('alumniLoggedInTokenCookie')
  const isJobAuthenticated = !!Cookies.get('jobUserLoggedInToken')
  const isAuthenticatedAuthId = Cookies.get('authIdCookie')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

    if (isAuthenticatedAuthId && Cookies.get('alumniLoggedInTokenCookie')){
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/info`,{
        params:{
          token:Cookies.get('alumniLoggedInTokenCookie').split('|')[1]
        }
      }).then((response) => {
        if (response.data.data.alumni == null && requiresAuth){
          next({ name: 'register' })
        } else if(response.data.data.alumni != null && requiresGuest){
          next({name: 'dashboard'})
        } else {
          next()
        }
      })
    } else if(isAuthenticatedAuthId && Cookies.get('jobUserLoggedInToken')){
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/info`,{
        params:{
          token:Cookies.get('jobUserLoggedInToken').split('|')[1]
        }
      }).then((response) => {
        if (response.data.data.alumni == null && requiresAuth){
          next({ name: 'register' })
        } else if(response.data.data.alumni != null && requiresGuest){
          next({name: 'dashboard'})
        } else {
          next()
        }
      })
    } else{
      if (requiresAuth){
        next({ name: 'login' })
      } else{
        next()
      }
    }

  });
  return router;
};
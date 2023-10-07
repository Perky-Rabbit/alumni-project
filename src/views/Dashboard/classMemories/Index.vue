<template>
    <div id="profile">
        <div class="row">
            <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                <div class="bg-white mb-3">
                    <div v-if="classMemories.background_image" class="py-4 px-3 border-bottom circular" style="height: 150px" :style="{ backgroundImage: 'url(' + classMemories.background_image + ')' }">
                        <img v-if="classMemories.profile_image" :src="classMemories.profile_image" class="img-fluid mt-2 rounded-circle" :alt="classMemories.id" style="width: 150px; height: 150px" />
                        <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px" />
                    </div>

                    <div v-else class="py-4 px-3 border-bottom circular" style="height: 150px" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }">
                        <img v-if="classMemories.profile_image" :src="classMemories.profile_image" class="img-fluid mt-2 rounded-circle" :alt="classMemories.id" style="width: 150px; height: 150px" />
                        <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px" />
                    </div>

                    <div class="col-12 p-3">
                        <span class="ml-auto small float-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm bg-light rounded-circle button-hover"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button">
                                        <i class="feather-edit"></i> report
                                    </button>
                                </div>
                            </div>
                        </span>
                    </div>

                    <div class="p-3">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <h5 class="font-weight-bold text-dark mb-1 mt-4">
                                        {{ classMemories.name }}
                                    </h5>
                                </tr>

                                <tr>
                                    <span class="btn text-muted underline-on-hover p-0" style="font-size: 15px" @click="classMemoryMemberModalShow()">
                                        {{ classMemories.totalMember }} members
                                    </span>
                                </tr>

                                <tr>
                                    <div class="d-flex align-items-center mt-3" v-if="classMemories.user_id != auth_id">
                                        <template v-if="classMemories.classMemoriesMember && classMemories.classMemoriesMember.length > 0">
                                            <button v-if="!search(auth_id, classMemories.classMemoriesMember)" type="button" class="btn btn-outline-secondary btn-sm rounded-pill btn-bl mr-3" @click="sendClassMemoriesJoinRequest(classMemories)">
                                                Join
                                            </button>

                                            <template v-else-if="search(auth_id, classMemories.classMemoriesMember) && search(auth_id, classMemories.classMemoriesMember).status == 'pending'">
                                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill btn-bl mr-3" @click="cancelClassMemoriesJoinRequest(classMemories)">
                                                    Withdrow
                                                </button>
                                            </template>

                                            <template v-else-if="search(auth_id, classMemories.classMemoriesMember) && search(auth_id, classMemories.classMemoriesMember).status == 'accept'">
                                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill btn-bl mr-3" @click="leaveThisClassMemories(classMemories)">
                                                    leave this class memories
                                                </button>
                                            </template>
                                        </template>

                                        <template v-else>
                                            <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill btn-bl mr-3" @click="sendClassMemoriesJoinRequest(classMemories)">
                                                Join
                                            </button>
                                        </template>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- create a post -->
                <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="p-3 d-flex align-items-center w-100" href="#">
                                <div class="dropdown-list-image mr-3">
                                    <img v-if="classMemories.profile_image" class="rounded-circle" :src="classMemories.profile_image" :alt="classMemories.id" />
                                    <img v-else class="rounded-circle" :src="avatar" :alt="alt" />
                                </div>
                                <div class="w-100">
                                    <button type="button"
                                        class="btn btn-outline-secondary btn-lg btn-block rounded-pill text-left"
                                        @click="addPostModalShow()">
                                        Start a post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- show all post -->
                <div v-for="(item, index) in classMemoriesNewsFeeds"
                    class="box shadow-sm border rounded bg-white mb-3 osahan-post">
                    <div class="pl-3 pr-3 pt-1 pb-1 d-flex align-items-center border-bottom osahan-post-header">
                        <div v-if="item.alumni.alumni" class="dropdown-list-image mr-3">
                            <img class="rounded-circle" :src="item.alumni.alumni.source" :alt="item.alumni.id" />
                        </div>
                        <div v-else class="dropdown-list-image mr-3">
                            <img class="rounded-circle" :src="avatar" :alt="alt" />
                        </div>

                        <div class="font-weight-bold">
                            <div class="text-truncate">
                                {{ item.alumni.first_name }} {{ item.alumni.middle_name }}
                                {{ item.alumni.last_name }}
                            </div>
                            <div class="small text-gray-500">
                                {{ item.alumni.designation_department }} at
                                {{ item.alumni.organization }}
                            </div>
                            <div class="small text-gray-500">{{ item.created_at }}</div>
                        </div>

                        <span v-if="item.alumni.id == auth_id" class="ml-auto small">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm rounded-circle button-hover"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button" @click="editPostModalShow(item)">
                                        <i class="feather-edit"></i> Edit
                                    </button>
                                    <button class="dropdown-item" type="button" @click="destroyPost(item)">
                                        <i class="feather-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </span>
                    </div>

                    <div class="p-3 osahan-post-body">
                        <span v-if="!readMore[item.id]">
                            {{item.show_less_body}}
                            <span @click="showMore(item.id)" v-if="item.body && item.body.length > 200" class="btn btn-sm underline-on-hover p-0 text-gray-500">...show more</span>
                        </span>

                        <span v-if="readMore[item.id]">
                            {{item.body}}
                            <span @click="showLess(item.id)" class="btn btn-sm underline-on-hover p-0 text-gray-500">show less</span>
                        </span>

                        <!-- image show -->
                        <table class="table-bordered table-active table-responsive" v-if="item.images.length">
                            <tbody v-if="item.images.length == 1">
                                <tr>
                                    <th>
                                        <img class="img-fluid" :src="item.images[0].source" alt="" style="width: 748px; height: 300px" />
                                    </th>
                                </tr>
                            </tbody>

                            <tbody v-if="item.images.length == 2">
                                <tr>
                                    <th v-for="(image, index) in item.images">
                                        <img class="img-fluid" :src="image.source" alt="" style="width: 374px; height: 300px" />
                                    </th>
                                </tr>
                            </tbody>

                            <tbody v-if="item.images.length == 3">
                                <tr>
                                    <th colspan="2">
                                        <img class="img-fluid" :src="item.images[0].source" alt="" style="width: 748px; height: 300px" />
                                    </th>
                                </tr>
                                <tr>
                                    <template v-for="(image, index) in item.images">
                                        <th v-if="index == 1 || index == 2">
                                            <img class="img-fluid" :src="image.source" alt="" style="width: 374px; height: 300px" />
                                        </th>
                                    </template>
                                </tr>
                            </tbody>

                            <tbody class="container" v-if="item.images.length > 3">
                                <tr>
                                    <th colspan="4">
                                        <img class="img-fluid" :src="item.images[0].source" alt="" style="width: 748px; height: 300px" />
                                    </th>
                                </tr>
                                <tr>
                                    <th colspan="2">
                                        <img class="img-fluid" :src="item.images[1].source" alt="" style="width: 374px; height: 300px; position: relative" />
                                    </th>
                                    <th colspan="2">
                                        <img class="img-fluid" :src="item.images[2].source" alt="" style="width: 374px; height: 300px; filter: brightness(50%);" />
                                        <h1 style="position: absolute; top: 72%; left: 72%; color: rgb(255, 255, 255);">
                                            +{{ item.images.length - 3 }}
                                        </h1>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <!-- left side -->
            <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
                <div class="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
                    <router-link :to="{ name: 'profile' }" class="font-weight-bold p-3 d-block">
                        <div class="px-3">
                            <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 150px; height: 150px" />
                            <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px" />
                        </div>
                        <h5 class="font-weight-bold text-dark mb-1 mt-4">
                            {{ alumni.first_name }} {{ alumni.middle_name }}
                            {{ alumni.last_name }}
                        </h5>
                        <p class="mb-0 text-muted">
                            {{ alumni.designation_department }} at {{ alumni.organization }}
                        </p>
                    </router-link>
                </div>
            </aside>

            <!-- right side -->
            <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
                <!-- <div class="box shadow-sm border rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                        <h6 class="m-0">Add to yoru feed</h6>
                    </div>
                    <div class="box-body p-3">
                        <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" :src="avatar" :alt="alt" />
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate">Shohel Rana</div>
                                <div class="small text-gray-500">Student at EWU</div>
                            </div>
                            <span class="ml-auto">
                                <button type="button" class="btn btn-light btn-sm" data-toggle="tooltip"
                                    data-placement="bottom" title="follow">
                                    <i class="feather-user-plus"></i>
                                </button>
                            </span>
                        </div>

                        <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" :src="avatar" :alt="alt" />
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate">Shohel Rana</div>
                                <div class="small text-gray-500">Student at EWU</div>
                            </div>
                            <span class="ml-auto">
                                <button type="button" class="btn btn-light btn-sm" data-toggle="tooltip"
                                    data-placement="bottom" title="follow">
                                    <i class="feather-user-plus"></i>
                                </button>
                            </span>
                        </div>

                        <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" :src="avatar" :alt="alt" />
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate">Shohel Rana</div>
                                <div class="small text-gray-500">Student at EWU</div>
                            </div>
                            <span class="ml-auto">
                                <button type="button" class="btn btn-light btn-sm" data-toggle="tooltip"
                                    data-placement="bottom" title="follow">
                                    <i class="feather-user-plus"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div> -->

                <div class="box shadow-sm border rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                        <h5 class="m-0">About this class memories</h5>
                    </div>

                    <div class="box-title border-bottom pt-2 pb-2 pl-3 pr-3">
                        <h6>Created</h6>
                        <span class="text-muted" style="font-size: 12px">
                            {{ classMemories.created_at }}
                        </span>
                    </div>

                    <div class="box-title border-bottom p-3">
                        <h6>Description</h6>
                        <span class="text-muted" style="font-size: 12px" v-html="classMemories.description"></span>
                    </div>

                    <div class="box-title p-3">
                        <h6>Rules</h6>
                        <span class="text-muted" style="font-size: 12px" v-html="classMemories.rules"></span>
                    </div>
                </div>
            </aside>

            <!-- class memory member Modal -->
            <div class="modal fade" id="classMemoryMemberModal" tabindex="-1" role="dialog"
                aria-labelledby="classMemoryMemberModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="classMemoryMemberModalLabel">
                                {{ classMemories.name }}
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="d-flex align-items-center osahan-post-header people-list mb-3" v-for="(item,index) in classMemoriesMembers">
                                <router-link :to="{ name: 'AnotherProfile', query: { username: item.alumni.username, id: item.alumni.id } }">
                                    <div class="mr-3" v-if="item.alumni.alumni">
                                        <img class="rounded-circle invitation-dropdown-list-image" :src="item.alumni.alumni.source" :alt="item.alumni.id">
                                    </div>
                                    <div v-else class="mr-3">
                                        <img class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                                    </div>
                                </router-link>

                                <div class="font-weight-bold mr-2">
                                    <router-link :to="{ name: 'AnotherProfile', query: { username: item.alumni.username, id: item.alumni.id } }">
                                        <div class="text-truncate">
                                            {{ item.alumni.first_name }} {{ item.alumni.middle_name }} {{ item.alumni.last_name }} 
                                            <code v-if="item.class_memories_role_ids">
                                                (<template v-for="(role,index) in item.class_memories_roles">{{ role.name }}{{ (index+1 < item.class_memories_roles.length) ? ', ' : '' }} </template>)
                                            </code>
                                        </div>
                                        
                                        <div class="small text-gray-500">
                                            {{ item.alumni.designation_department }} at {{ item.alumni.organization }}
                                        </div>
                                    </router-link>
                                </div>

                                <div class="ml-auto mb-auto">
                                    <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill mr-1" @click="addPermissionModalShow(item)">
                                    <i class="feather-settings"></i> Permission
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- add permission modal -->
            <div class="modal fade" id="addPermissionModal" tabindex="-1" role="dialog" aria-labelledby="addPermissionModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <form @submit.prevent="addClassMemoriesRolePermission">
                    <div class="modal-dialog modal-sm" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addPermissionModalLabel">Add permission</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <div class="form-check" v-for="(value,key) in classMemoriesRoles">
                                    <input v-model="permissionForm.permission" :value="value.id" class="form-check-input" type="checkbox">
                                    <label class="form-check-label">{{ value.name }}</label>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button :disabled="form.busy" type="submit" class="btn btn-sm btn-success">Add</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Post Modal -->
            <div class="modal fade" id="addEditPostModal" tabindex="-1" role="dialog" aria-labelledby="addEditPostModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <form @submit.prevent="postEditMode ? update() : store()">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addEditPostModalLabel">
                                    {{ postEditMode? "Update": "Create" }} post
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                                    <div class="d-flex align-items-center osahan-post-header people-list">
                                        <div class="mr-3">
                                            <img v-if="alumni.profile_image" class="border rounded-circle invitation-dropdown-list-image" :src="alumni.profile_image" :alt="alumni.id">
                                            <img v-else class="border rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                                        </div>

                                        <div class="mr-2">
                                            <div class="font-weight-bold">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</div>
                                            <div class="text-muted">{{ alumni.designation_department }} at {{ alumni.organization }} </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <textarea v-model="form.body" class="form-control" rows="4" cols="50" placeholder="What do you want to talk about?" style="border: none; overflow: auto; outline: none;-webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none; resize: none;">
                                    </textarea>
                                </div>

                                <!-- image preview -->
                                <div v-if="classMemoriesNewsFeedImagePreview.length" class="form-group text-center border rounded">
                                    <div class="d-flex">
                                    <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="imageCancel">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                    </div>

                                    <table>
                                    <tbody v-if="classMemoriesNewsFeedImagePreview.length == 1">
                                        <tr>
                                        <th colspan="4">
                                            <img class="img-fluid" :src="classMemoriesNewsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                                        </th>
                                        </tr>
                                    </tbody>

                                    <tbody v-if="classMemoriesNewsFeedImagePreview.length == 2">
                                        <tr>
                                        <th colspan="2" v-for="(item,index) in classMemoriesNewsFeedImagePreview">
                                            <img class="img-fluid" :src="item" alt="" style="width:374px; height: 300px;">
                                        </th>
                                        </tr>
                                    </tbody>

                                    <tbody v-if="classMemoriesNewsFeedImagePreview.length == 3">
                                        <tr>
                                        <th colspan="4">
                                            <img class="img-fluid" :src="classMemoriesNewsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                                        </th>
                                        </tr>
                                        <tr>
                                            <template v-for="(item,index) in classMemoriesNewsFeedImagePreview">
                                            <th colspan="2" v-if="index == 1 || index == 2">
                                                <img class="img-fluid" :src="item" alt="" style="width:374px; height: 300px;">
                                            </th>
                                            </template>
                                        </tr>
                                    </tbody>

                                    <tbody class="container" v-if="classMemoriesNewsFeedImagePreview.length > 3">
                                        <tr>
                                        <th colspan="5">
                                            <img class="img-fluid" :src="classMemoriesNewsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                                        </th>
                                        </tr>
                                        <tr>
                                            <th colspan="2">
                                                <img class="img-fluid" :src="classMemoriesNewsFeedImagePreview[1]" alt="" style="width:374px; height: 300px; position: relative;">
                                            </th>
                                            <th colspan="2">
                                                <img class="img-fluid" :src="classMemoriesNewsFeedImagePreview[2]" alt="" style="width:374px; height: 300px; filter: brightness(50%);">
                                                <h1 style="position: absolute; top: 72%; left: 72%; color: rgb(255, 255, 255);">+{{ classMemoriesNewsFeedImagePreview.length - 3 }}</h1>
                                            </th>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="pl-3 pr-3">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="mb-0" for="visibility" style="font-size: 11px;">Visibility Permission</label>
                                            <select v-model="form.visibility" id="view_type_sorting" class="form-control form-control-sm">
                                                <option value="anyone">&#xf0ac; Anyone</option>
                                                <option value="connections">&#xf500; Connections</option>
                                                <option value="only_me">&#xf235; Only Me</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="mb-0" for="comment_permission" style="font-size: 11px;">Comment Permission</label>
                                            <select v-model="form.comment_permission" id="view_type_sorting" class="form-control form-control-sm">
                                                <option value="enable">&#xf0ac; Enable</option>
                                                <option value="disable">&#xf500; Disable</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-light pl-3 pr-3 pb-2 pt-2">
                                <div class="box-title d-flex align-items-center">
                                    <label class="btn btn-outline-secondary btn-sm mb-0 mr-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Add a photo">
                                        <i class="feather-image fa-1x text-secondary"></i>
                                        <input :disabled="disabled" accept="image/*" type="file" multiple class="form-control news-feed-file-input" id="image-input" @change="onClassMemoriesNewsFeedImageChange">
                                    </label>

                                    <button type="submit" class="btn btn-outline-secondary btn-sm ml-auto" data-bs-toggle="tooltip" data-bs-placement="top" title="Post">
                                        <i class="feather-send fa-1x text-secondary"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <vue-progress-bar></vue-progress-bar>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useStore } from '../../../store';
const store = useStore();
import Cookies from 'js-cookie';
import { useHead } from '@vueuse/head';
import Form from "vform";
import {Button, HasError, AlertError, AlertErrors, AlertSuccess} from "vform/src/components/bootstrap5";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import Editor from "@tinymce/tinymce-vue";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    name: "Index",
    components: {Button, HasError, AlertError, AlertErrors, AlertSuccess, Multiselect, Editor},

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id: Cookies.get('alumniIdCookie'),
            alumni: "",
            classMemories: "",
            classMemoriesMembers: [],
            classMemoriesRoles: [],

            permissionForm: new Form({
                id: "",
                class_memories_member_id: '',
                permission: [],
            }),

            postEditMode: false,
            classMemoriesNewsFeedImagePreview: [],
            disabled: false,
            form: new Form({
                id: "",
                alumni_id: Cookies.get('alumniIdCookie'),
                class_memories_id: this.$route.query.id,
                title: "",
                body: "",
                posted_at: "",
                visibility: "anyone",
                comment_permission: "enable",
                image: [],
            }),

            classMemoriesNewsFeeds: [],
            readMore: {},
        };
    },

    mounted() {
        this.getData();

        // tooltip
        var tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },

    methods: {
        showMore(id) {
            this.readMore[id] = true;
        },
        showLess(id) {
            this.readMore[id] = false;
        },

        search(nameKey, myArray){
            for (let i=0; i < myArray.length; i++) {
                if (myArray[i].alumni_id == nameKey) {
                    return myArray[i];
                }
            }
        },

        getData() {
            // authenticate alumni information response
            axios.get(`${this.backendUrl}/alumni/`+this.auth_id)
            .then((response) => {
                this.alumni = response.data.data.alumni;
            })
            .catch((e) => {
                console.log(e);
            });

            // class memories information response
            axios.get(`${this.backendUrl}/class-memories/` + this.$route.query.id)
            .then((response) => {
                this.classMemories = response.data.data.classMemories;
                useHead({title: this.classMemories.name +' | EWU'})
            })
            .catch((e) => {
                console.log(e);
            });

            // class memories member list response
            axios.get(`${this.backendUrl}/get-class-memories-member-list/` + this.$route.query.id)
            .then((response) => {
                this.classMemoriesMembers = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });

            // class memories member role list response
            axios.get(`${this.backendUrl}/get-class-memories-roles`)
            .then((response) => {
                this.classMemoriesRoles = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });

            // class memories news feed response
            axios.get(`${this.backendUrl}/class-memories-news-feed`, { params: { auth_id: this.auth_id, class_memories_id: this.$route.query.id } })
            .then((response) => {
                this.classMemoriesNewsFeeds = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // send class memories joining request
        sendClassMemoriesJoinRequest(classMemories) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/send-class-memories-join-request/` + classMemories.id, {auth_id: this.auth_id})
            .then((response) => {
                this.getData();
                this.$Progress.finish();
                toast.success(response.data.message);
            })
            .catch((e) => {
                this.$Progress.fail();
                console.log(e);
            });
        },

        // cancel class memories joining request
        cancelClassMemoriesJoinRequest(classMemories) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: "Do you want to cancel the request?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "NO",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${this.backendUrl}/cancel-class-memories-join-request/` + classMemories.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.getData();
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },

        // leave this class memories
        leaveThisClassMemories(classMemories) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: "Do you want to leave this group?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "NO",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${this.backendUrl}/leave-this-class-memories/` + classMemories.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.getData();
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },

        // class memories member modal
        classMemoryMemberModalShow(){
            $("#classMemoryMemberModal").modal("show");
        },

        // class memories member role permission modal
        addPermissionModalShow(classMemories) {
            this.permissionForm.class_memories_member_id = classMemories.id;
            $("#addPermissionModal").modal("show");
        },

        // create class memories member role permission
        addClassMemoriesRolePermission() {
            this.$Progress.start();
            this.permissionForm.busy = true;
            this.permissionForm.post(`${this.backendUrl}/add-class-memories-permission/` + this.permissionForm.class_memories_member_id)
            .then((response) => {
                this.getData();
                if (this.permissionForm.successful) {
                    $("#addPermissionModal").modal("hide");
                    this.permissionForm.reset();
                    this.$Progress.finish();
                    toast.success("Class memories member permission added");
                } else {
                    this.$Progress.fail();
                    toast.error("Something went wrong. Try again later.");
                }
            })
            .catch((e) => {
                this.$Progress.fail();
                console.log(e);
            });
        },

        // add post modal
        addPostModalShow() {
            this.postEditMode = false;
            $("#addEditPostModal").modal("show");
        },

        // class memories news feed image load
        onClassMemoriesNewsFeedImageChange(e) {
            let files = e.target.files;
            this.form.image = [];
            this.classMemoriesNewsFeedImagePreview = [];
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.classMemoriesNewsFeedImagePreview[i] = reader.result;
                    this.form.image[i] = reader.result;
                };
                reader.readAsDataURL(files[i]);
            }

            if (files) {
                this.disabled = true;
            }
        },

        // class memories news feed image cancel
        imageCancel() {
            $("#image-input").val("");
            this.classMemoriesNewsFeedImagePreview = [];
            this.disabled = false;
        },

        // class memories news feed store
        store() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.post(`${this.backendUrl}/class-memories-news-feed`)
            .then((response) => {
                this.getData();
                if (this.form.successful) {
                    this.$Progress.finish();
                    toast.success(response.data.message);
                    this.form.reset();
                    this.disabled = false;
                    $('#image-input').val('')
                    this.classMemoriesNewsFeedImagePreview = "";
                    $("#addEditPostModal").modal("hide");
                } else {
                    this.$Progress.fail();
                    toast.error("Something went wrong. Try again later.");
                }
            })
            .catch((e) => {
                this.$Progress.fail();
                console.log(e);
            });
        },

        // class memories news feed edit modal
        editPostModalShow(item) {
            this.postEditMode = true;
            this.form.fill(item);
            this.form.image = [];
            this.classMemoriesNewsFeedImagePreview = [];
            item.images.forEach((value, index) => {
                this.classMemoriesNewsFeedImagePreview[index] = value.source;
            });
            $("#addEditPostModal").modal("show");
        },

        // class memories news feed update
        update() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.put(`${this.backendUrl}/class-memories-news-feed/` + this.form.id)
            .then((response) => {
                this.getData();
                if (this.form.successful) {
                    this.$Progress.finish();
                    toast.success(response.data.message);
                    this.form.reset();
                    this.disabled = false;
                    $('#image-input').val('')
                    this.classMemoriesNewsFeedImagePreview = "";
                    $("#addEditPostModal").modal("hide");
                } else {
                    this.$Progress.fail();
                    toast.error("Something went wrong. Try again later.");
                }
            })
            .catch((e) => {
                this.$Progress.fail();
                console.log(e);
            });
        },

        // class memories news feed delete
        destroyPost(post) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${this.backendUrl}/class-memories-news-feed/` + post.id)
                    .then((response) => {
                        this.$swal.fire("Deleted!", response.data.message, "success");
                        this.getData();
                    });
                }
            });
        },
    },
};
</script>

<style>
.underline-on-hover:hover {
    text-decoration: underline !important;
    color: blue !important;
}

.news-feed-file-input {
    opacity: 0;
    position: absolute;
    visibility: hidden;
}

.button-hover:hover {
    background-color: #eae7e7;
    transition: 0.7s;
}

label.button-hover {
    margin-bottom: 0px;
}

.invitation-dropdown-list-image {
    height: 3rem;
    width: 3rem;
}

#view_type_sorting {
    font-family: Arial, FontAwesome;
}

#view_type_sorting::before {
    vertical-align: middle;
}

.container {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.container img {
    vertical-align: middle;
}

.container .content {
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0);
    /* Fallback color */
    background: rgba(0, 0, 0, 0.5);
    /* Black background with 0.5 opacity */
    color: #f1f1f1;
    width: 100%;
    padding: 20px;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.gallery img {
    width: 245px;
    height: 170px;
    border: 2px solid lightsteelblue;
    border-radius: 5px;
}
</style>

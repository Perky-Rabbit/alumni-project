<template>
    <div id="profile">
        <div class="row">
            <!-- Main Content -->
            <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                <div class="bg-white mb-3">
                    <div v-if="group.background_image" class="py-4 px-3 border-bottom circular" style="height: 150px" :style="{ backgroundImage: 'url(' + group.background_image + ')' }">
                        <img v-if="group.profile_image" :src="group.profile_image" class="img-fluid mt-2 rounded-circle" :alt="group.id" style="width: 150px; height: 150px" />
                        <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px" />
                    </div>

                    <div v-else class="py-4 px-3 border-bottom circular" style="height: 150px" :style="{ backgroundImage: 'url(' + backgroud_image + ')', }">
                        <img v-if="group.profile_image" :src="group.profile_image" class="img-fluid mt-2 rounded-circle" :alt="group.id" style="width: 150px; height: 150px" />
                        <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px" />
                    </div>

                    <!-- <div class="col-12 p-3">
                        <span class="ml-auto small float-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm bg-light rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button">
                                        <i class="feather-edit"></i> report
                                    </button>
                                </div>
                            </div>
                        </span>
                    </div> -->

                    <div class="p-3">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <h5 class="font-weight-bold text-dark mb-1 mt-4">
                                        {{ group.name }}
                                    </h5>
                                </tr>

                                <tr>
                                    <!-- <router-link class="text-muted underline-on-hover" style="font-size: 15px" :to="{ name: 'groupMember'}"> -->

                                    <router-link class="text-muted underline-on-hover" style="font-size: 15px" :to="{ path: 'group-member', query: { group_id: this.$route.query.id } }">
                                        {{ group.total_member }} members
                                    </router-link>
                                </tr>

                                <tr v-if="groupMemberAlumniId == auth_id">
                                    <template v-for="group_member in group.group_member">
                                        <div v-if="group_member.alumni_id  == auth_id && group_member.status == 'pending' && group.user_id != group_member.alumni_id">
                                            <button type="button" class="btn btn-secondary btn-sm rounded-pill btn-bl mt-3" @click="cancelGroupJoinRequest(group)">
                                                Withdrow
                                            </button>
                                        </div>

                                        <div v-if="group_member.alumni_id  == auth_id && group_member.status == 'accept' && group.user_id != group_member.alumni_id">
                                            <button type="button" class="btn btn-secondary btn-sm rounded-pill btn-bl mt-3"
                                            @click="leaveThisGroup(group)">
                                                leave this group
                                            </button>
                                        </div>
                                    </template>
                                </tr>

                                <tr v-else>
                                    <button type="button" class="btn btn-secondary btn-sm rounded-pill btn-bl mt-3" @click="sendGroupJoinRequest(group)">
                                        Join
                                    </button>
                                </tr>

                                <!-- <tr v-if="group.group_member && group.group_member.length">
                                    <template v-for="group_member in group.group_member">
                                        <div v-if="group_member.alumni_id  == auth_id && group_member.status == 'pending'">
                                            <button type="button" class="btn btn-secondary btn-sm rounded-pill btn-bl mt-3" @click="cancelGroupJoinRequest(group)">
                                                Withdrow
                                            </button>
                                        </div>

                                        <div v-if="group_member.alumni_id  == auth_id && group_member.status == 'accept'">
                                            <button type="button" class="btn btn-secondary btn-sm rounded-pill btn-bl mt-3"
                                            @click="leaveThisGroup(group)">
                                                leave this group
                                            </button>
                                        </div>
                                    </template>
                                </tr>

                                <tr v-else>
                                    <button type="button" class="btn btn-secondary btn-sm rounded-pill btn-bl mt-3" @click="sendGroupJoinRequest(group)">
                                        Join
                                    </button>
                                </tr> -->

                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="groupMemberAlumniId == auth_id && groupMemberStatus == 'accept'" class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="p-3 d-flex align-items-center w-100" href="#">
                                <div class="dropdown-list-image mr-3">
                                    <img class="rounded-circle" :src="group.profile_image" :alt="alumni.id" />
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

                    <!-- <div class="p-2 d-flex align-items-center">
                        <div class="mr-auto">
                            <label class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-3">
                                <span class="fa-stack">
                                    <i class="fa-regular fa-image fa-2x text-primary" aria-hidden="true"></i>
                                </span>
                                Photo
                                <input :disabled="disabled" accept="image/*" type="file" multiple class="form-control news-feed-file-input" id="image-input" @click="addPostModalShow()" @change="onGroupNewsFeedImageChange" />
                            </label>
                        </div>

                        <div class="mr-auto">
                            <label class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-3">
                                <span class="fa-stack">
                                    <i class="fa-brands fa-youtube fa-2x text-success" aria-hidden="true"></i>
                                </span>
                                Video
                                <input :disabled="disabled" accept="video/mp4,video/x-m4v,video/*" type="file" class="form-control news-feed-file-input" id="video-input" @click="addPostModalShow()" @change="onGroupNewsFeedVideoChange" />
                            </label>
                        </div>

                        <div class="mr-auto">
                            <button type="button"
                                class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-3">
                                <span class="fa-stack">
                                    <i class="fa-solid fa-calendar-days fa-2x text-info" aria-hidden="true"></i>
                                </span>
                                Event
                            </button>
                        </div>

                        <div class="mr-auto">
                            <button type="button"
                                class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-3">
                                <span class="fa-stack">
                                    <i class="fa-solid fa-newspaper fa-2x text-warning" aria-hidden="true"></i>
                                </span>
                                Write Article
                            </button>
                        </div>
                    </div> -->
                </div>

                <!-- all post show -->
                <div v-for="(item, index) in groupNewsFeeds"
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
                                <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button" @click="editPostModalShow(item)">
                                        <i class="feather-edit"></i> Edit
                                    </button>
                                    <button class="dropdown-item" type="button" @click="destroyGroupPost(item)">
                                        <i class="feather-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </span>
                    </div>

                    <!-- <div class="p-3 border-bottom osahan-post-body"> -->
                    <div class="p-3 osahan-post-body">
                        <span v-if="!readMore[item.id]">
                            {{item.show_less_body}}
                            <span @click="showMore(item.id)" v-if="item.body && item.body.length > 200" class="btn btn-sm underline-on-hover p-0 text-gray-500">...show more</span>
                        </span>

                        <span v-if="readMore[item.id]">
                            {{item.body}}
                            <span @click="showLess(item.id)" class="btn btn-sm underline-on-hover p-0 text-gray-500">show less</span>
                        </span>

                        <!-- image show start -->
                        <table class="table-bordered table-active table-responsive">
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

                                        <h1 style="position: absolute; top: 72%;left: 72%; color: rgb(255, 255, 255);">
                                            +{{ item.images.length - 3 }}
                                        </h1>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <!-- image show end -->

                        <!-- video show start -->
                        <table class="table mb-0">
                            <tbody v-if="item.video">
                                <tr>
                                    <embed :src="item.video" width="100%" style="max-height: 50rem; min-height: 20rem" />
                                </tr>
                            </tbody>
                        </table>
                        <!-- video show end -->

                        <!-- document show start -->
                        <table class="table mb-0">
                            <tbody v-if="item.document">
                                <tr>
                                    <embed :src="item.document + '#toolbar=0'" width="100%" style="max-height: 50rem; min-height: 20rem" />
                                </tr>
                            </tbody>
                        </table>
                        <!-- document show end -->
                    </div>

                    <!-- <div class="pt-2 pb-2 pl-3 pr-3 border-bottom osahan-post-footer">
                        <span class="mr-3 text-secondary underline-on-hover">
                            <i class="fa-solid fa-thumbs-up text-primary"></i> 16
                        </span>
                        <span class="mr-3 text-secondary underline-on-hover">
                            <i class="fa-solid fa-comment text-success"></i> 8
                        </span>
                        <span class="mr-3 text-secondary underline-on-hover">
                            <i class="fa-solid fa-arrows-spin text-info"></i> 2
                        </span>
                    </div> -->

                    <!-- <div class="p-3 d-flex align-items-center">
                        <div class="mr-auto">
                            <button type="button"
                                class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
                                <span class="text-muted">
                                    <i class="fa-solid fa-thumbs-up mr-2" aria-hidden="true"></i>Like
                                </span>
                            </button>
                        </div>

                        <div class="mr-auto">
                            <button type="button"
                                class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
                                <span class="text-muted">
                                    <i class="fa-solid fa-comment mr-2" aria-hidden="true"></i>Comment
                                </span>
                            </button>
                        </div>

                        <div class="mr-auto">
                            <button type="button"
                                class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
                                <span class="text-muted">
                                    <i class="fa-solid fa-arrows-spin mr-2" aria-hidden="true"></i>Repost
                                </span>
                            </button>
                        </div>

                        <div class="mr-auto">
                            <button type="button"
                                class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
                                <span class="text-muted">
                                    <i class="fa-solid fa-paper-plane mr-2" aria-hidden="true"></i>Send
                                </span>
                            </button>
                        </div>
                    </div> -->
                </div>
            </main>

            <!-- left side -->
            <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
            <!-- <aside class="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12"> -->
                <div class="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
                    <router-link :to="{ name: 'profile' }" class="font-weight-bold p-3 d-block">
                        <div class="px-3">
                            <img :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id"
                                style="width: 150px; height: 150px" />
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

                <div id="basicsAccordion">
                    <div class="box shadow-sm border rounded bg-white mb-2">
                        <div  id="basicsHeadingOne">
                            <h5 class="mb-0">
                                <button class="shadow-none btn btn-block d-flex justify-content-between card-btn p-3 collapsed" data-toggle="collapse" data-target="#basicsCollapseOne" aria-expanded="false" aria-controls="basicsCollapseOne">
                                Gallery
                                <span class="card-btn-arrow">
                                <span class="feather-chevron-down"></span>
                                </span>
                                </button>
                            </h5>
                        </div>

                        <div id="basicsCollapseOne" class="collapse" aria-labelledby="basicsHeadingOne" data-parent="#basicsAccordion" style="">
                            <div class="card-body pl-3 pr-3 pt-0 text-muted">
                                <span class="btn btn-link p-0" @click="photoGalleryModalShow()">
                                    Photos
                                </span><br>
                                <span class="btn btn-link p-0" @click="videoGalleryModalShow()">
                                    Videos
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- right side -->
            <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
            <!-- <aside class="col col-xl-4 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12"> -->
                <div class="box shadow-sm border rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                        <h5 class="m-0">About this group</h5>
                    </div>

                    <div class="box-title border-bottom pt-2 pb-2 pl-3 pr-3">
                        <h6>Created</h6>
                        <span class="text-muted" style="font-size: 12px">
                            {{ group.created_at }}
                        </span>
                    </div>

                    <div class="box-title border-bottom p-3">
                        <h6>Description</h6>
                        <span class="text-muted" style="font-size: 12px" v-html="group.description"></span>
                    </div>

                    <div class="box-title p-3">
                        <h6>Rules</h6>
                        <span class="text-muted" style="font-size: 12px" v-html="group.rules"></span>
                    </div>
                </div>
            </aside>

            <!-- Post Modal -->
            <div class="modal fade" id="addEditPostModal" tabindex="-1" role="dialog" aria-labelledby="addEditPostModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <form @submit.prevent="postEditMode ? update() : store()">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addEditPostModalLabel">{{ postEditMode? "Update": "Create" }} post</h5>
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
                                    <textarea v-model="form.body" class="form-control-custom" rows="4" cols="50" placeholder="What do you want to talk about?" style="border: none; overflow: auto; outline: none; -webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none; resize: none; "></textarea>
                                </div>

                                <!-- image preview start -->
                                <div v-if="groupNewsFeedImagePreview.length" class="form-group text-center border rounded">
                                    <div class="d-flex">
                                        <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="imageCancel">
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>

                                    <table>
                                        <tbody v-if="groupNewsFeedImagePreview.length == 1">
                                            <tr>
                                                <th colspan="4">
                                                    <img class="img-fluid" :src="groupNewsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                                                </th>
                                            </tr>
                                        </tbody>

                                        <tbody v-if="groupNewsFeedImagePreview.length == 2">
                                            <tr>
                                                <th colspan="2" v-for="(item,index) in groupNewsFeedImagePreview">
                                                    <img class="img-fluid" :src="item" alt="" style="width:374px; height: 300px;">
                                                </th>
                                            </tr>
                                        </tbody>

                                        <tbody v-if="groupNewsFeedImagePreview.length == 3">
                                            <tr>
                                                <th colspan="4">
                                                    <img class="img-fluid" :src="groupNewsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                                                </th>
                                            </tr>
                                            <tr>
                                                <template v-for="(item,index) in groupNewsFeedImagePreview">
                                                    <th colspan="2" v-if="index == 1 || index == 2">
                                                        <img class="img-fluid" :src="item" alt="" style="width:374px; height: 300px;">
                                                    </th>
                                                </template>
                                            </tr>
                                        </tbody>

                                        <tbody class="container" v-if="groupNewsFeedImagePreview.length > 3">
                                            <tr>
                                                <th colspan="5">
                                                    <img class="img-fluid" :src="groupNewsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                                                </th>
                                            </tr>
                                            <tr>
                                                <th colspan="2">
                                                    <img class="img-fluid" :src="groupNewsFeedImagePreview[1]" alt="" style="width:374px; height: 300px; position: relative;">
                                                </th>
                                                <th colspan="2">
                                                    <img class="img-fluid" :src="groupNewsFeedImagePreview[2]" alt="" style="width:374px; height: 300px;     filter: brightness(50%);">
                                                    <h1 style="position: absolute; top: 72%; left: 72%; color: rgb(255, 255, 255);">+{{ groupNewsFeedImagePreview.length - 3 }}</h1>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- video preview start -->
                                <div v-if="groupNewsFeedVideoPreview" class="form-group text-center border rounded">
                                    <div class="d-flex">
                                        <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="videoCancel">
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>

                                    <table class="table mb-0">
                                        <tbody v-if="groupNewsFeedVideoPreview">
                                            <tr>
                                                <embed :src="groupNewsFeedVideoPreview" width="100%" style="max-height: 50rem; min-height: 20rem"/>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- document preview start -->
                                <div v-if="groupNewsFeedDocumentPreview" class="form-group text-center border rounded">
                                    <div class="d-flex">
                                        <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="documentCancel">
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>

                                    <table class="table mb-0">
                                        <tbody v-if="groupNewsFeedDocumentPreview">
                                            <tr>
                                                <embed :src="groupNewsFeedDocumentPreview" width="100%" style="max-height: 50rem; min-height: 20rem"/>
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
                                                <option value="anyone">&#xf0ac; Anyone</option>
                                                <option value="connections">&#xf500; Connections</option>
                                                <option value="only_me">&#xf235; Only Me</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-light pl-3 pr-3 pb-2 pt-2">
                                <div class="box-title d-flex align-items-center">
                                    <label class="btn btn-outline-secondary btn-sm mb-0 mr-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Add a photo">
                                    <i class="feather-image fa-1x text-secondary"></i>
                                    <input :disabled="disabled" accept="image/*" type="file" multiple class="form-control news-feed-file-input" id="image-input" @change="onGroupNewsFeedImageChange">
                                    </label>
                                    
                                    <label class="btn btn-outline-secondary btn-sm mb-0 mr-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Add a video">
                                    <i class="feather-video fa-1x text-secondary"></i>
                                    <input :disabled="disabled" accept="video/mp4,video/x-m4v,video/*" type="file" class="form-control news-feed-file-input" id="video-input" @change="onGroupNewsFeedVideoChange">
                                    </label>

                                    <label class="btn btn-outline-secondary btn-sm mb-0 mr-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Add a document">
                                    <i class="feather-file-plus fa-1x text-secondary"></i>
                                    <input :disabled="disabled" type="file" class="form-control news-feed-file-input" accept=".xls,.xlsx, application/*" id="document-input" @change="onGroupNewsFeedDocumentChange">
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

            <!-- Photo gallery Modal -->
            <div class="modal fade" id="photoGalleryModal" tabindex="-1" role="dialog"
                aria-labelledby="photoGalleryModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="photoGalleryModalLabel">
                                {{ group.name }}
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="row">
                                <template v-for="(item, index) in groupNewsFeeds">
                                    <div class="col-md-4 p-1 gallery" v-for="(image, index) in item.images">
                                        <img :src="image.source" :alt="group.id" data-toggle="modal" data-target="#imageModal" @click="openImgDialog($event)">
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <span type="button" class="close text-center" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>

                        <div class="modal-body">
                            <img id="my_image" style="width: 100%; height: 300px;" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Video gallery Modal -->
            <div class="modal fade" id="videoGalleryModal" tabindex="-1" role="dialog"
                aria-labelledby="videoGalleryModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="videoGalleryModalLabel">
                                {{ group.name }}
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-4 p-1 gallery" v-for="(item, index) in groupNewsFeeds">
                                    <template v-if="item.video">
                                        <video width="250" height="150" controls="controls" preload="metadata">
                                            <source :src="item.video" type="video/mp4">
                                        </video>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";
import { useToast } from "vue-toastification";
const toast = useToast();
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import Editor from "@tinymce/tinymce-vue";

export default {
    name: "Profile",
    components: {
        Button,
        HasError,
        AlertError,
        AlertErrors,
        AlertSuccess,
        Multiselect,
        Editor,
    },

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            backgroud_image: store.$state.backgroud_image,
            auth_id: Cookies.get('alumniIdCookie'),
            postEditMode: false,
            alumni: "",
            group: "",
            groupMemberAlumniId: '',
            groupMemberStatus: '',

            groupNewsFeeds: [],
            readMore: {},

            groupNewsFeedImagePreview: [],
            groupNewsFeedVideoPreview: "",
            groupNewsFeedDocumentPreview: "",
            disabled: false,
            form: new Form({
                id: "",
                alumni_id: Cookies.get('alumniIdCookie'),
                group_id: this.$route.query.id,
                title: "",
                body: "",
                posted_at: "",
                visibility: "anyone",
                comment_permission: "enable",
                image: [],
                video: "",
                document: "",
            }),
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

        getData() {
            axios.get(`${this.backendUrl}/alumni/`+this.auth_id)
            .then((response) => {
                this.alumni = response.data.data.alumni;
            })
            .catch((e) => {
                console.log(e);
            });

            axios.get(`${this.backendUrl}/group/` + this.$route.query.id)
            .then((response) => {
                this.group = response.data.data.group;
                // console.log(this.group);
                useHead({title: this.group.name +' | EWU'})

                this.group.group_member.forEach(element => {
                    this.groupMemberAlumniId = element.alumni_id;
                    this.groupMemberStatus = element.status;
                });
            })
            .catch((e) => {
                console.log(e);
            });

            axios.get(`${this.backendUrl}/group-news-feed`, { params: { auth_id: this.auth_id, group_id: this.$route.query.id } })
            .then((response) => {
                this.groupNewsFeeds = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });
        },

        sendGroupJoinRequest(group) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/send-group-join-request/` + group.id, {auth_id: this.auth_id})
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

        cancelGroupJoinRequest(group) {
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
                    axios.post(`${this.backendUrl}/cancel-group-join-request/` + group.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.getData();
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },

        leaveThisGroup(group) {
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
                    axios.post(`${this.backendUrl}/leave-this-group/` + group.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.getData();
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },

        addPostModalShow() {
            this.postEditMode = false;
            $("#addEditPostModal").modal("show");
        },

        onGroupNewsFeedImageChange(e) {
            let files = e.target.files;
            this.form.image = [];
            this.groupNewsFeedImagePreview = [];
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.groupNewsFeedImagePreview[i] = reader.result;
                    this.form.image[i] = reader.result;
                };
                reader.readAsDataURL(files[i]);
            }

            if (files) {
                this.disabled = true;
            }
        },

        imageCancel() {
            $("#image-input").val("");
            this.groupNewsFeedImagePreview = [];
            this.disabled = false;
        },

        onGroupNewsFeedVideoChange(e) {
            let file = e.target.files[0];
            this.form.video = file;
            this.groupNewsFeedVideoPreview = URL.createObjectURL(file);

            if (file) {
                this.disabled = true;
            }
        },

        videoCancel() {
            $("#video-input").val("");
            this.groupNewsFeedVideoPreview = "";
            this.disabled = false;
        },

        onGroupNewsFeedDocumentChange(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (e) => {
                this.groupNewsFeedDocumentPreview = reader.result;
                this.form.document = reader.result;
            };
            reader.readAsDataURL(file);

            if (file) {
                this.disabled = true;
            }
        },

        documentCancel() {
            $("#document-input").val("");
            this.groupNewsFeedDocumentPreview = "";
            this.disabled = false;
        },

        store() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.post(`${this.backendUrl}/group-news-feed`)
            .then((response) => {
                this.getData();
                if (this.form.successful) {
                    this.$Progress.finish();
                    toast.success(response.data.message);
                    this.form.reset();
                    this.disabled = false;
                    // $('#file').val('')
                    this.groupNewsFeedImagePreview = "";
                    this.groupNewsFeedVideoPreview = "";
                    this.groupNewsFeedDocumentPreview = "";
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

        editPostModalShow(item) {
            this.postEditMode = true;
            this.form.fill(item);
            this.form.image = [];
            this.form.document = "";
            this.form.video = "";
            this.groupNewsFeedImagePreview = [];
            item.images.forEach((value, index) => {
                this.groupNewsFeedImagePreview[index] = value.source;
            });

            this.groupNewsFeedDocumentPreview = item.document;
            this.groupNewsFeedVideoPreview = item.video;

            $("#addEditPostModal").modal("show");
        },

        update() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.put(`${this.backendUrl}/group-news-feed/` + this.form.id)
            .then((response) => {
                this.getData();
                $("#addEditPostModal").modal("hide");
                if (this.form.successful) {
                    this.$Progress.finish();
                    toast.success(response.data.message);
                    this.form.reset();
                    this.disabled = false;
                    // $('#file').val('')
                    this.groupNewsFeedImagePreview = "";
                    this.groupNewsFeedVideoPreview = "";
                    this.groupNewsFeedDocumentPreview = "";
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

        destroyGroupPost(groupPost) {
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
                        axios.delete(`${this.backendUrl}/group-news-feed/` + groupPost.id)
                        .then((response) => {
                            this.$swal.fire("Deleted!", response.data.message, "success");
                            this.getData();
                        });
                    }
                });
        },

        photoGalleryModalShow() {
            $("#photoGalleryModal").modal("show");
        },

        openImgDialog($event){
            var imgsrc = $event.target.src;
            $('#my_image').attr('src',imgsrc);
        },

        videoGalleryModalShow() {
            $("#videoGalleryModal").modal("show");
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
  /* margin: 2px; */
  /* object-fit: cover; */
  border: 2px solid lightsteelblue;
  border-radius: 5px;
}

@media screen and (max-width: 400px) {
    .reduceWidth {
        width: 130px;
    }
}
</style>

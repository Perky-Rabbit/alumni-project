<template>
  <div id="index" class="row">
    <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
      <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="p-3 d-flex align-items-center w-100" href="#">
              <div class="dropdown-list-image mr-3">
                <img v-if="alumni.profile_image" class="rounded-circle" :src="alumni.profile_image" :alt="alumni.id" />
                <img v-else class="rounded-circle" :src="avatar" :alt="alt" />

                <div class="status-indicator bg-success"></div>
              </div>
              <div class="w-100">
                <button type="button" class="btn btn-outline-secondary btn-lg btn-block rounded-pill text-left" @click="createEditPostModalShow()">
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
              <input :disabled="disabled" accept="image/*" type="file" multiple class="form-control news-feed-file-input" id="image-input" @click="createEditPostModalShow()" @change="onNewsFeedImageChange">
            </label>
          </div>

          <div class="mr-auto">
            <label class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-3">
              <span class="fa-stack">
                <i class="fa-brands fa-youtube fa-2x text-success" aria-hidden="true"></i>
              </span>
              Video
              <input :disabled="disabled" accept="video/mp4,video/x-m4v,video/*" type="file" class="form-control news-feed-file-input" id="video-input" @click="createEditPostModalShow()" @change="onNewsFeedVideoChange">
            </label>
          </div>

          <div class="mr-auto">
            <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-3">
              <span class="fa-stack">
                <i class="fa-solid fa-calendar-days fa-2x text-info" aria-hidden="true"></i>
              </span>
              Event
            </button>
          </div>

          <div class="mr-auto">
            <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-3">
              <span class="fa-stack">
                <i class="fa-solid fa-newspaper fa-2x text-warning" aria-hidden="true"></i>
              </span>
              Write Article
            </button>
          </div>
        </div> -->
      </div>

      <template v-for="(item,index) in newsFeeds">
        <div v-if="isPostVisible(item)" class="box shadow-sm border rounded bg-white mb-3 osahan-post">
          <div class="pl-3 pr-3 pt-1 pb-1 d-flex align-items-center border-bottom osahan-post-header">
            <div v-if="item.alumni.alumni" class="dropdown-list-image mr-3">
              <img class="rounded-circle" :src="item.alumni.alumni.source" :alt="item.alumni.id" />
            </div>
            <div v-else class="dropdown-list-image mr-3">
              <img class="rounded-circle" :src="avatar" :alt="alt" />
            </div>

            <div class="font-weight-bold">
              <div class="text-truncate">{{ item.alumni.first_name }} {{ item.alumni.middle_name }} {{ item.alumni.last_name }}</div>
              <div class="small text-gray-500">{{ item.alumni.designation_department }} at {{ item.alumni.organization }}</div>
              <div class="small text-gray-500">{{ item.created_at }}</div>
            </div>

            <span class="ml-auto small">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a v-if="item.alumni.id == auth_id" class="dropdown-item" type="button" @click="editPostModalShow(item)">
                      <i class="feather-edit"></i> Edit
                    </a>
                    <a v-if="item.alumni.id == auth_id" class="dropdown-item" type="button" @click="destroyPost(item)">
                      <i class="feather-trash"></i> Delete
                    </a>
                    <a v-if="item.alumni.id != auth_id" class="dropdown-item" type="button" @click="reportModalShow(item)">
                      <i class="feather-flag"></i> Report
                    </a>
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

            <table class="table-bordered table-active table-responsive" v-if="item.images.length">
              <tbody v-if="item.images.length == 1">
                <tr>
                  <th>
                    <img class="img-fluid" :src="item.images[0].source" alt="" style="width:748px; height: 300px;">
                  </th>
                </tr>
              </tbody>

              <tbody v-if="item.images.length == 2">
                <tr>
                  <th v-for="(image,index) in item.images">
                      <img class="img-fluid" :src="image.source" alt="" style="width:374px; height: 300px;">
                  </th>
                </tr>
              </tbody>

              <tbody v-if="item.images.length == 3">
                <tr>
                  <th colspan="2">
                    <img class="img-fluid" :src="item.images[0].source" alt="" style="width:748px; height: 300px;">
                  </th>
                </tr>
                <tr>
                    <template v-for="(image,index) in item.images">
                      <th v-if="index == 1 || index == 2">
                          <img class="img-fluid" :src="image.source" alt="" style="width:374px; height: 300px;">
                      </th>
                    </template>
                </tr>
              </tbody>

              <tbody class="container" v-if="item.images.length > 3">
                <tr>
                  <th colspan="4">
                    <img class="img-fluid" :src="item.images[0].source" alt="" style="width:748px; height: 300px;">
                  </th>
                </tr>
                <tr>
                    <th colspan="2">
                        <img class="img-fluid" :src="item.images[1].source" alt="" style="width:374px; height: 300px; position: relative;">
                    </th>
                    <th colspan="2">
                        <img class="img-fluid" :src="item.images[2].source" alt="" style="width:374px; height: 300px;     filter: brightness(50%);">
                        <h1 style="position: absolute; top: 72%; left: 72%; color: rgb(255, 255, 255);">+{{ item.images.length - 3 }}</h1>
                    </th>
                </tr>
              </tbody>
            </table>

            <table class="table mb-0">
              <tbody v-if="item.video">
                <tr>
                  <!-- <embed autoplay="0" autostart="0" :src="item.video" width="100%" style="max-height: 50rem; min-height: 20rem"/> -->
                  <!-- <iframe
                    :src="item.video"
                    width="100%"
                    style="border: 2px solid white; max-height: 50rem; min-height: 20rem"
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe> -->
                  <video :src="item.video" width="512" height="310" controls></video>
                </tr>
              </tbody>
            </table>

            <table class="table mb-0">
              <tbody v-if="item.document">
                <tr>
                  <embed :src="item.document+'#toolbar=0'" width="100%" style="max-height: 50rem; min-height: 20rem"/>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <!-- <div v-for="(item,index) in newsFeeds" class="box shadow-sm border rounded bg-white mb-3 osahan-post">
        <div class="pl-3 pr-3 pt-1 pb-1 d-flex align-items-center border-bottom osahan-post-header">
          <div v-if="item.alumni.alumni" class="dropdown-list-image mr-3">
            <img class="rounded-circle" :src="item.alumni.alumni.source" :alt="item.alumni.id" />
          </div>
          <div v-else class="dropdown-list-image mr-3">
            <img class="rounded-circle" :src="avatar" :alt="alt" />
          </div>

          <div class="font-weight-bold">
            <div class="text-truncate">{{ item.alumni.first_name }} {{ item.alumni.middle_name }} {{ item.alumni.last_name }}</div>
            <div class="small text-gray-500">{{ item.alumni.designation_department }} at {{ item.alumni.organization }}</div>
            <div class="small text-gray-500">{{ item.created_at }}</div>
          </div>

          <span class="ml-auto small">
              <div class="btn-group">
                <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a v-if="item.alumni.id == auth_id" class="dropdown-item" type="button" @click="editPostModalShow(item)">
                    <i class="feather-edit"></i> Edit
                  </a>
                  <a v-if="item.alumni.id == auth_id" class="dropdown-item" type="button" @click="destroyPost(item)">
                    <i class="feather-trash"></i> Delete
                  </a>
                  <a v-if="item.alumni.id != auth_id" class="dropdown-item" type="button" @click="reportModalShow(item)">
                    <i class="feather-flag"></i> Report
                  </a>
                </div>
              </div>
          </span>
        </div>

        <div class="p-3 border-bottom osahan-post-body">
          <span v-if="!readMore[item.id]">
            {{item.show_less_body}}
            <span @click="showMore(item.id)" v-if="item.body && item.body.length > 200" class="btn btn-sm underline-on-hover p-0 text-gray-500">...show more</span>
          </span>

          <span v-if="readMore[item.id]">
            {{item.body}}
            <span @click="showLess(item.id)" class="btn btn-sm underline-on-hover p-0 text-gray-500">show less</span>
          </span>

          <table class="table-bordered table-active table-responsive" v-if="item.images.length">
            <tbody v-if="item.images.length == 1">
              <tr>
                <th>
                  <img class="img-fluid" :src="item.images[0].source" alt="" style="width:748px; height: 300px;">
                </th>
              </tr>
            </tbody>

            <tbody v-if="item.images.length == 2">
              <tr>
                <th v-for="(image,index) in item.images">
                    <img class="img-fluid" :src="image.source" alt="" style="width:374px; height: 300px;">
                </th>
              </tr>
            </tbody>

            <tbody v-if="item.images.length == 3">
              <tr>
                <th colspan="2">
                  <img class="img-fluid" :src="item.images[0].source" alt="" style="width:748px; height: 300px;">
                </th>
              </tr>
              <tr>
                  <template v-for="(image,index) in item.images">
                    <th v-if="index == 1 || index == 2">
                        <img class="img-fluid" :src="image.source" alt="" style="width:374px; height: 300px;">
                    </th>
                  </template>
              </tr>
            </tbody>

            <tbody class="container" v-if="item.images.length > 3">
              <tr>
                <th colspan="4">
                  <img class="img-fluid" :src="item.images[0].source" alt="" style="width:748px; height: 300px;">
                </th>
              </tr>
              <tr>
                  <th colspan="2">
                      <img class="img-fluid" :src="item.images[1].source" alt="" style="width:374px; height: 300px; position: relative;">
                  </th>
                  <th colspan="2">
                      <img class="img-fluid" :src="item.images[2].source" alt="" style="width:374px; height: 300px;     filter: brightness(50%);">
                      <h1 style="position: absolute; top: 72%; left: 72%; color: rgb(255, 255, 255);">+{{ item.images.length - 3 }}</h1>
                  </th>
              </tr>
            </tbody>
          </table>

          <table class="table mb-0">
            <tbody v-if="item.video">
              <tr>
                <embed :src="item.video" width="100%" style="max-height: 50rem; min-height: 20rem"/>
              </tr>
            </tbody>
          </table>

          <table class="table mb-0">
            <tbody v-if="item.document">
              <tr>
                <embed :src="item.document+'#toolbar=0'" width="100%" style="max-height: 50rem; min-height: 20rem"/>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pt-2 pb-2 pl-3 pr-3 border-bottom osahan-post-footer">
          <span class="mr-3 text-secondary underline-on-hover">
            <i class="fa-solid fa-thumbs-up text-primary"></i> 16
          </span>
          <span class="mr-3 text-secondary underline-on-hover">
            <i class="fa-solid fa-comment text-success"></i> 8
          </span>
          <span class="mr-3 text-secondary underline-on-hover">
            <i class="fa-solid fa-arrows-spin text-info"></i> 2
          </span>
        </div>

        <div class="p-3 d-flex align-items-center">
          <div class="mr-auto">
            <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
              <span class="text-muted">
                <i class="fa-solid fa-thumbs-up mr-2" aria-hidden="true"></i>Like
              </span>
            </button>
          </div>

          <div class="mr-auto">
            <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
              <span class="text-muted">
                <i class="fa-solid fa-comment mr-2" aria-hidden="true"></i>Comment
              </span>
            </button>
          </div>

          <div class="mr-auto">
            <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
              <span class="text-muted">
                <i class="fa-solid fa-arrows-spin mr-2" aria-hidden="true"></i>Repost
              </span>
            </button>
          </div>

          <div class="mr-auto">
            <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
              <span class="text-muted">
                <i class="fa-solid fa-paper-plane mr-2" aria-hidden="true"></i>Send
              </span>
            </button>
          </div>
        </div>
      </div> -->
    </main>

    <!-- Post Modal -->
    <!-- <div class="modal fade" id="createEditPostModal" tabindex="-1" role="dialog" aria-labelledby="createEditPostModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <form @submit.prevent="store()">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createEditPostModalLabel">Create a post</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                <div class="d-flex align-items-center osahan-post-header people-list">
                  <div class="mr-3">
                      <img class="border rounded-circle invitation-dropdown-list-image" :src="image_url" :alt="alumni.id">
                  </div>

                  <div class="font-weight-bold mr-2">
                      <div class="text-truncate">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</div>
                      
                      <div class="input-group border rounded-pill">
                        <div class="input-group-text form-control-sm rounded-0" style="height: 25px;"><i class="fa-solid fa-eye"></i></div>
                        <select v-model="form.visibility" id="view_type_sorting" class="form-control form-control-sm" style="height: 25px;">
                          <option value="anyone">&#xf0ac; Anyone</option>
                          <option value="connections">&#xf500; Connections</option>
                          <option value="only_me">&#xf235; Only Me</option>
                        </select>
                      </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <textarea v-model="form.body" class="form-control" rows="4" cols="50" placeholder="What do you want to talk about?" style="border: none; overflow: auto; outline: none; -webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none; resize: none; "></textarea>
              </div>

              <div v-if="newsFeedImagePreview.length" class="form-group text-center border rounded">
                <div class="d-flex">
                  <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="imageCancel">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <table>
                  <tbody v-if="newsFeedImagePreview.length == 1">
                    <tr>
                      <th colspan="4">
                        <img class="img-fluid" :src="newsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                      </th>
                    </tr>
                  </tbody>

                  <tbody v-if="newsFeedImagePreview.length == 2">
                    <tr>
                      <th colspan="2" v-for="(item,index) in newsFeedImagePreview">
                          <img class="img-fluid" :src="item" alt="" style="width:374px; height: 300px;">
                      </th>
                    </tr>
                  </tbody>

                  <tbody v-if="newsFeedImagePreview.length == 3">
                    <tr>
                      <th colspan="4">
                        <img class="img-fluid" :src="newsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                      </th>
                    </tr>
                    <tr>
                        <template v-for="(item,index) in newsFeedImagePreview">
                          <th colspan="2" v-if="index == 1 || index == 2">
                              <img class="img-fluid" :src="item" alt="" style="width:374px; height: 300px;">
                          </th>
                        </template>
                    </tr>
                  </tbody>

                  <tbody class="container" v-if="newsFeedImagePreview.length > 3">
                    <tr>
                      <th colspan="5">
                        <img class="img-fluid" :src="newsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                      </th>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <img class="img-fluid" :src="newsFeedImagePreview[1]" alt="" style="width:374px; height: 300px; position: relative;">
                        </th>
                        <th colspan="2">
                            <img class="img-fluid" :src="newsFeedImagePreview[2]" alt="" style="width:374px; height: 300px;     filter: brightness(50%);">
                            <h1 style="position: absolute; top: 72%; left: 72%; color: rgb(255, 255, 255);">+{{ newsFeedImagePreview.length - 3 }}</h1>
                        </th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="newsFeedVideoPreview" class="form-group text-center border rounded">
                <div class="d-flex">
                  <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="videoCancel">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <table class="table mb-0">
                  <tbody v-if="newsFeedVideoPreview">
                    <tr>
                      <embed :src="newsFeedVideoPreview" width="100%" style="max-height: 50rem; min-height: 20rem"/>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="newsFeedDocumentPreview" class="form-group text-center border rounded">
                <div class="d-flex">
                  <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="documentCancel">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <table class="table mb-0">
                  <tbody v-if="newsFeedDocumentPreview">
                    <tr>
                      <embed :src="newsFeedDocumentPreview" width="100%" style="max-height: 50rem; min-height: 20rem"/>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="modal-footer">
              <div class="d-flex align-items-center osahan-post-header people-list mr-auto">
                  <div class="font-weight-bold">
                    <label class="btn btn-sm rounded-circle button-hover hideButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Add a photo">
                      <i class="fa-regular fa-image fa-1x text-secondary"></i>
                      <input :disabled="disabled" accept="image/*" type="file" multiple class="form-control news-feed-file-input" id="image-input" @change="onNewsFeedImageChange">
                    </label>
                  </div>

                  <div class="font-weight-bold">
                    <label class="btn btn-sm rounded-circle button-hover hideButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Add a video">
                      <i class="fa-brands fa-youtube fa-1x text-secondary"></i>
                      <input :disabled="disabled" accept="video/mp4,video/x-m4v,video/*" type="file" class="form-control news-feed-file-input" id="video-input" @change="onNewsFeedVideoChange" >
                    </label>
                  </div>

                  <div class="font-weight-bold">
                    <label class="btn btn-sm rounded-circle button-hover hideButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Add a document">
                      <i class="fa-solid fa-file fa-1x text-secondary"></i>
                      <input :disabled="disabled" type="file" class="form-control news-feed-file-input" accept=".xls,.xlsx, application/*" id="document-input" @change="onNewsFeedDocumentChange">
                    </label>
                  </div>

                  <div class="font-weight-bold mr-2">
                    <button :disabled="disabled" type="button" class="btn btn-sm rounded-circle button-hover" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to your post">
                      <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                    </button>
                  </div>

                  <div class="font-weight-bold reduceWidth">
                      <div class="input-group border rounded-pill">
                        <div class="input-group-text form-control-sm rounded-0" style="height: 25px;"><i class="fa-solid fa-comment"></i></div>
                        <select v-model="form.comment_permission" id="view_type_sorting" class="form-control form-control-sm" style="height: 25px;">
                          <option value="anyone">&#xf0ac; Anyone</option>
                          <option value="connections">&#xf500; Connections</option>
                          <option value="only_me">&#xf235; Only Me</option>
                        </select>
                      </div>
                  </div>
              </div>

              <div class="d-flex align-items-center osahan-post-header people-list">
                  <div class="font-weight-bold">
                      <button type="submit" class="btn btn-sm btn-secondary rounded-circle float-right" data-bs-toggle="tooltip" data-bs-placement="top" title="Post">
                        <i class="fa-solid fa-paper-plane"></i>
                      </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div> -->

    <div class="modal fade" id="createEditPostModal" tabindex="-1" role="dialog" aria-labelledby="createEditPostModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <form @submit.prevent="postEditMode ? update() : store()">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createEditPostModalLabel">{{ postEditMode? "Update": "Create" }} post</h5>
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
                      
                      <!-- <div class="input-group border rounded-pill">
                        <div class="input-group-text form-control-sm rounded-0" style="height: 25px;"><i class="fa-solid fa-eye"></i></div>
                        <select v-model="form.visibility" id="view_type_sorting" class="form-control form-control-sm" style="height: 25px;">
                          <option value="anyone">&#xf0ac; Anyone</option>
                          <option value="connections">&#xf500; Connections</option>
                          <option value="only_me">&#xf235; Only Me</option>
                        </select>
                      </div> -->
                  </div>
                </div>
              </div>

              <div class="form-group">
                <textarea v-model="form.body" class="form-control-custom" rows="4" cols="50" placeholder="What do you want to talk about?" style="border: none; overflow: auto; outline: none; -webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none; resize: none; "></textarea>
                <HasError :form="form" field="body" />
              </div>

              <!-- image preview start -->
              <div v-if="newsFeedImagePreview.length" class="form-group text-center border rounded">
                <div class="d-flex">
                  <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="imageCancel">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <table>
                  <tbody v-if="newsFeedImagePreview.length == 1">
                    <tr>
                      <th colspan="4">
                        <img class="img-fluid" :src="newsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                      </th>
                    </tr>
                  </tbody>

                  <tbody v-if="newsFeedImagePreview.length == 2">
                    <tr>
                      <th colspan="2" v-for="(item,index) in newsFeedImagePreview">
                          <img class="img-fluid" :src="item" alt="" style="width:374px; height: 300px;">
                      </th>
                    </tr>
                  </tbody>

                  <tbody v-if="newsFeedImagePreview.length == 3">
                    <tr>
                      <th colspan="4">
                        <img class="img-fluid" :src="newsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                      </th>
                    </tr>
                    <tr>
                        <template v-for="(item,index) in newsFeedImagePreview">
                          <th colspan="2" v-if="index == 1 || index == 2">
                              <img class="img-fluid" :src="item" alt="" style="width:374px; height: 300px;">
                          </th>
                        </template>
                    </tr>
                  </tbody>

                  <tbody class="container" v-if="newsFeedImagePreview.length > 3">
                    <tr>
                      <th colspan="5">
                        <img class="img-fluid" :src="newsFeedImagePreview[0]" alt="" style="width:748px; height: 300px;">
                      </th>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <img class="img-fluid" :src="newsFeedImagePreview[1]" alt="" style="width:374px; height: 300px; position: relative;">
                        </th>
                        <th colspan="2">
                            <img class="img-fluid" :src="newsFeedImagePreview[2]" alt="" style="width:374px; height: 300px;     filter: brightness(50%);">
                            <h1 style="position: absolute; top: 72%; left: 72%; color: rgb(255, 255, 255);">+{{ newsFeedImagePreview.length - 3 }}</h1>
                        </th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- video preview start -->
              <div v-if="newsFeedVideoPreview" class="form-group text-center border rounded">
                <div class="d-flex">
                  <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="videoCancel">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <table class="table mb-0">
                  <tbody v-if="newsFeedVideoPreview">
                    <tr>
                      <embed :src="newsFeedVideoPreview" width="100%" style="max-height: 50rem; min-height: 20rem"/>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- document preview start -->
              <div v-if="newsFeedDocumentPreview" class="form-group text-center border rounded">
                <div class="d-flex">
                  <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="documentCancel">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <table class="table mb-0">
                  <tbody v-if="newsFeedDocumentPreview">
                    <tr>
                      <embed :src="newsFeedDocumentPreview" width="100%" style="max-height: 50rem; min-height: 20rem"/>
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
                  <input :disabled="disabled" accept="image/*" type="file" multiple class="form-control news-feed-file-input" id="image-input" @change="onNewsFeedImageChange">
                </label>
                
                <label class="btn btn-outline-secondary btn-sm mb-0 mr-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Add a video">
                  <i class="feather-video fa-1x text-secondary"></i>
                  <input :disabled="disabled" accept="video/mp4,video/x-m4v,video/*" type="file" class="form-control news-feed-file-input" id="video-input" @change="onNewsFeedVideoChange">
                </label>

                <label class="btn btn-outline-secondary btn-sm mb-0 mr-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Add a document">
                  <i class="feather-file-plus fa-1x text-secondary"></i>
                  <input :disabled="disabled" type="file" class="form-control news-feed-file-input" accept=".xls,.xlsx, application/*" id="document-input" @change="onNewsFeedDocumentChange">
                </label>
                
                <!-- <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Add an event" @click="eventModalShow()">
                  <i class="feather-calendar fa-1x text-secondary"></i>
                </button> -->

                <button type="submit" class="btn btn-outline-secondary btn-sm ml-auto" data-bs-toggle="tooltip" data-bs-placement="top" title="Post">
                  <i class="feather-send fa-1x text-secondary"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Report modal -->
    <div class="modal fade" id="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
      <form @submit.prevent="reportStore()">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="reportModalLabel">Report</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <label for="type" class="mb-1">Type</label>
                <select v-model="reportForm.report_type_id" class="form-control">
                    <option value="">Select One</option>
                    <option v-for="(item,index) in reportTypes" :value="item.data.id">{{item.data.name}}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="description" class="mb-1">Description</label>
                <textarea v-model="reportForm.description" class="form-control" rows="3" placeholder="Why are you reporting this?"></textarea>
              </div>

              <div class="float-right">
                <button :disabled="reportForm.busy" type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- left aside -->
    <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
      <div class="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
        <div class="py-4 px-3">
          <router-link :to="{ name: 'profile'}" class="font-weight-bold p-3 d-block">
            <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 150px; height: 150px;" />
            <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px;" />
          </router-link>

          <h5 class="font-weight-bold text-dark mb-1 mt-4">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</h5>
          <p class="text-muted">{{ alumni.designation_department }} at {{alumni.organization}}</p>

          <router-link class="text-muted underline-on-hover" :to="{ name: 'connection'}">
            {{ totalFriends }} connections
          </router-link>
        </div>
      </div>

      <div class="box mb-3 shadow-sm rounded bg-white view-box overflow-hidden">
        <div class="box-title text-center border-bottom p-3">
          <h6 class="m-0">Profile completion (%)</h6>
        </div>
        <div class="d-flex text-center">
          <div class="col-12 py-4 px-2">
            <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" :style="{width:profileCompletionPercentageAmount+'%'}">
                {{ profileCompletionPercentageAmount }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- right aside -->
    <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
      <!-- <div class="box shadow-sm border rounded bg-white mb-3"> -->
      <div class="box shadow-sm rounded bg-white mb-3">
        <div class="box-title border-bottom p-3">
          <h6 class="m-0">Add to your feed</h6>
        </div>

        <div class="box-body p-3">
            <template v-for="(item,index) in followingUsers">
              <div class="d-flex align-items-center osahan-post-header mb-3 people-list" v-if="index < 2">
                  <div class="dropdown-list-image mr-3">
                    <img v-if="item.profile_image" class="rounded-circle" :src="item.profile_image" :alt="item.id" />
                    <img v-else class="rounded-circle" :src="avatar" :alt="alt" />
                    <!-- <div class="status-indicator bg-success"></div> -->
                  </div>
                  <div class="font-weight-bold mr-2">
                    <div class="text-truncate">{{item.name}}</div>
                    <div class="small text-gray-500">{{item.designation_department}} at {{item.organization}}</div>
                  </div>
                  <span class="ml-auto">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="follow" @click="follow(item)">
                      <i class="feather-user-plus"></i>
                    </button>
                  </span>
              </div>
            </template>
        </div>

        <div class="pt-2 pb-2 pl-3 pr-3 border-top osahan-post-footer text-center div-footer-show-all">
          <router-link :to="{ name: 'MyNetwork' }"><b>Show all <i class="fa-solid fa-arrow-right"></i></b></router-link>
        </div>
      </div>
      
      <!-- <div class="box shadow-sm border rounded bg-white mb-3">
        <div class="box-title border-bottom p-3">
          <h6 class="m-0">Jobs</h6>
        </div>

        <div class="box-body p-3">
          <a href="job-profile.html">
            <div class="shadow-sm border rounded bg-white job-item mb-3">
              <div class="d-flex align-items-center p-3 job-item-header">
                <div class="overflow-hidden mr-2">
                  <h6 class="font-weight-bold text-dark mb-0 text-truncate">
                    Product Director
                  </h6>
                  <div class="text-truncate text-primary">Perky Rabbit Corporation Ltd.</div>
                  <div class="small text-gray-500">
                    <i class="feather-map-pin"></i> BD, Dhaka
                  </div>
                </div>
                <img class="img-fluid ml-auto" :src="avatar" :alt="alt" />
              </div>
              <div class="d-flex align-items-center p-3 border-top border-bottom job-item-body">
                <div class="overlap-rounded-circle">
                  <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                    :src="avatar" :alt="alt" data-original-title="Sophia Lee" />
                  <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                    :src="avatar" :alt="alt" data-original-title="John Doe" />
                  <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                    :src="avatar" :alt="alt" data-original-title="Julia Cox" />
                  <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                    :src="avatar" :alt="alt" data-original-title="Robert Cook" />
                </div>
                <span class="font-weight-bold text-muted">18 connections</span>
              </div>
              <div class="p-3 job-item-footer">
                <small class="text-gray-500"><i class="feather-clock"></i> Posted 3 Days ago</small>
              </div>
            </div>
          </a>

          <a href="job-profile.html">
            <div class="shadow-sm border rounded bg-white job-item mb-3">
              <div class="d-flex align-items-center p-3 job-item-header">
                <div class="overflow-hidden mr-2">
                  <h6 class="font-weight-bold text-dark mb-0 text-truncate">
                    Product Director
                  </h6>
                  <div class="text-truncate text-primary">Perky Rabbit Corporation Ltd.</div>
                  <div class="small text-gray-500">
                    <i class="feather-map-pin"></i> BD, Dhaka
                  </div>
                </div>
                <img class="img-fluid ml-auto" :src="avatar" :alt="alt" />
              </div>
              <div class="d-flex align-items-center p-3 border-top border-bottom job-item-body">
                <div class="overlap-rounded-circle">
                  <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                    :src="avatar" :alt="alt" data-original-title="Sophia Lee" />
                  <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                    :src="avatar" :alt="alt" data-original-title="John Doe" />
                  <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                    :src="avatar" :alt="alt" data-original-title="Julia Cox" />
                  <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                    :src="avatar" :alt="alt" data-original-title="Robert Cook" />
                </div>
                <span class="font-weight-bold text-muted">18 connections</span>
              </div>
              <div class="p-3 job-item-footer">
                <small class="text-gray-500"><i class="feather-clock"></i> Posted 3 Days ago</small>
              </div>
            </div>
          </a>

        </div>
      </div> -->
    </aside>

    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from '../../store';
const store = useStore();
import Cookies from 'js-cookie';
import { useHead } from '@vueuse/head';
import Form from "vform";
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";
import Editor from '@tinymce/tinymce-vue';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "Index",
  components: {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
    Editor,
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      auth_id: Cookies.get('alumniIdCookie'),
      postEditMode: false,

      alumni: '',
      connections: [],
      profileCompletionPercentageAmount: '',
      totalFriends: '',

      page_name: "home",
      newsFeeds: [],
      readMore: {},

      // newsfeed form
      newsFeedImagePreview: [],
      newsFeedVideoPreview: '',
      newsFeedDocumentPreview: '',
      disabled: false,
      form: new Form({
        id: '',
        alumni_id: Cookies.get('alumniIdCookie'),
        title: '',
        body: '',
        posted_at: '',
        visibility: 'anyone',
        comment_permission: 'anyone',
        image: [],
        video: '',
        document: '',
      }),

      // report form
      reportTypes: [],
      reportForm: new Form({
        id: '',
        sender_id: '',
        recipient_id: '',
        attribute: '',
        attribute_id: '',
        report_type_id: "",
        description: "",
      }),

      followingUsers: [],
    };
  },

  mounted() {
    this.getData();

    // tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  },

  beforeCreate() {
    useHead({title: 'Dashboard | EWU'})
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

      axios.post(`${this.backendUrl}/get-connection-friends`, { auth_id: this.auth_id })
      .then((response) => {
          this.connections = response.data.data
          // console.log(response);
      })
      .catch((e) => {
          console.log(e);
      });

      axios.get(`${this.backendUrl}/alumni/profile-completion-percentage/`+this.auth_id)
      .then((response) => {
        this.profileCompletionPercentageAmount = response.data.percentage;
      })
      .catch((e) => {
        console.log(e);
      });

      axios.get(`${this.backendUrl}/total-friends-count`, { params: {auth_id:this.auth_id} })
      .then((response) => {
          this.totalFriends = response.data.data;
      })
      .catch((e) => {
          this.$Progress.fail();
      });

      axios.get(`${this.backendUrl}/news-feed`, { params: { auth_id: this.auth_id, page_name: this.page_name } })
      .then((response) => {
        this.newsFeeds = response.data.data
        // console.log(this.newsFeeds);
      })
      .catch((e) => {
        console.log(e);
      });

      axios.get(`${this.backendUrl}/report-type`)
      .then((response) => {
        this.reportTypes = response.data.data
      })
      .catch((e) => {
        console.log(e);
      });

      // suggestion following alumni list response
      axios.get(`${this.backendUrl}/get-suggestion-following-alumnis`, { params: { auth_id:this.auth_id } })
      .then((response) => {
        this.followingUsers = response.data.data;
        // console.log(this.followingUsers);
      })
      .catch((e) => {
        console.log(e);
      });
    },

    // post visibility code start
    isPostVisible(post) {
      if (post.visibility === 'only_me') {
        // Post visible only to the user who created it
        return post.alumni.id == this.auth_id;
      } 
      else if (post.visibility === 'connections') {
        // Post visible to the user and their connections
        // var found = '';
        // for(var i = 0; i < this.connections.length; i++) {
        //     if (this.connections[i].id == post.alumni.id) {
        //         found = true;
        //         break;
        //     }
        // }

        // return post.alumni.id == this.auth_id || this.connections.includes(post.alumni.id);
        // return post.alumni.id == this.auth_id || found;
        return post.alumni.id == this.auth_id || this.connections.some(item => item.id === post.alumni.id);
      }
      else{
        // Post visible to everyone
        return true;
      }
    },

    // post part start
    createEditPostModalShow() {
      this.postEditMode = false;
      $("#createEditPostModal").modal("show");
    },

    onNewsFeedImageChange(e) {
      let files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.newsFeedImagePreview[i] = reader.result;
          this.form.image[i] = reader.result;
        };
        reader.readAsDataURL(files[i]);
      }

      if (files) {
        this.disabled = true;
      }
    },

    imageCancel() {
      $('#image-input').val("");
      this.newsFeedImagePreview = [];
      this.disabled = false;
    },

    onNewsFeedVideoChange(e) {
      let file = e.target.files[0];
      this.form.video = file;
      this.newsFeedVideoPreview = URL.createObjectURL(file);

      if (file) {
        this.disabled = true;
      }

      // let blobURL = URL.createObjectURL(file);
      // document.querySelector("video").style.display = 'block';
      // document.querySelector("video").src = blobURL;
    },

    videoCancel() {
      $('#video-input').val("");
      this.newsFeedVideoPreview = '';
      this.disabled = false;
    },

    onNewsFeedDocumentChange(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.newsFeedDocumentPreview = reader.result;
        this.form.document = reader.result;
      }
      reader.readAsDataURL(file);
        
      if (file) {
        this.disabled = true;
      }
    },

    documentCancel() {
      $('#document-input').val("");
      this.newsFeedDocumentPreview = '';
      this.disabled = false;
    },

    store() {
      this.$Progress.start();
      this.form.busy = true;
      this.form.post(`${this.backendUrl}/news-feed`)
        .then((response) => {
          this.getData();
          $("#createEditPostModal").modal("hide");
          if (this.form.successful) {
            this.$Progress.finish();

            axios.post(`${this.backendUrl}/create-new-post-notification`, {
              redirect_url: 'dashboard',
              sender_id: this.auth_id
            })

            toast.success('New post created');
            this.form.reset()
            this.disabled = false
            $('#image-input').val('')
            $('#video-input').val('')
            $('#document-input').val('')
            this.newsFeedImagePreview = ''
            this.newsFeedVideoPreview = ''
            this.newsFeedDocumentPreview = ''
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

    // update part start
    editPostModalShow(item) {
      this.postEditMode = true;
      this.form.fill(item);
      this.form.document = '';
      this.form.image = [];
      this.newsFeedImagePreview = [];
      item.images.forEach((value, index) => {
        this.newsFeedImagePreview[index] = value.source;
      });

      this.newsFeedDocumentPreview = item.document;

      $("#createEditPostModal").modal("show");
    },

    update() {
      this.$Progress.start();
      this.form.busy = true;
      this.form.put(`${this.backendUrl}/news-feed/`+ this.form.id)
      .then((response) => {
        this.getData();
        $("#createEditPostModal").modal("hide");
        if (this.form.successful) {
          this.$Progress.finish();
          toast.success('Post is updated');
          this.form.reset()
          this.disabled = false
          $('#image-input').val('')
          $('#video-input').val('')
          $('#document-input').val('')
          this.newsFeedImagePreview = ''
          this.newsFeedVideoPreview = ''
          this.newsFeedDocumentPreview = ''
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

    // destroy port part
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
            axios.delete(`${this.backendUrl}/news-feed/` + post.id)
            .then((response) => {
              this.$swal.fire("Deleted!", response.data.message, "success");
              this.getData();
            });
          }
        });
    },

    // report part start
    reportModalShow(item) {
      this.reportForm.sender_id = Number(this.auth_id);
      this.reportForm.recipient_id = item.alumni.id;
      this.reportForm.attribute = 'App\\Models\\NewsFeed';
      this.reportForm.attribute_id = item.id;
      $("#reportModal").modal("show");
    },

    reportStore() {
      this.$Progress.start();
      this.reportForm.busy = true;
      this.reportForm.post(`${this.backendUrl}/report`)
      .then((response) => {
        if (this.reportForm.successful) {
          this.$Progress.finish();
          toast.success('Report is created');
          this.reportForm.reset()
          $("#reportModal").modal("hide");
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

    // following code start
    follow(alumni) {
        this.$swal
        .fire({
            title: "Are you sure?",
            text: `Are you sure you want to follow ${ alumni.first_name } ${ alumni.middle_name } ${ alumni.last_name }.`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            cancelButtonText: "NO",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes",
        })
        .then((result) => {
            if (result.isConfirmed) {
                axios.post(`${this.backendUrl}/follow/` + alumni.id, {auth_id: this.auth_id})
                .then((response) => {
                    this.$swal.fire("Success", response.data.message, "success");
                    this.getData();
                });
            }
        });
    },
    // following code end
  },
};
</script>

<style>
  .underline-on-hover:hover {
    text-decoration: underline !important;
    color: blue !important; 
	}

  .news-feed-file-input {
    opacity:0;
    position: absolute;
    visibility: hidden;
  }

  .button-hover:hover{
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

  #view_type_sorting{
    font-family: Arial, FontAwesome;
  }

  #view_type_sorting::before{
    vertical-align:middle;
  }

  .container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.container img {vertical-align: middle;}

.container .content {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0); /* Fallback color */
  background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}

.form-control-custom{
  padding: 0;
  width: 100%;
}

.custom-form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.custom-form-control, .btn {
  font-size: 15px;
  padding: 0px;
  height: auto;
}
</style>


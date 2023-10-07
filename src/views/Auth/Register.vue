<template>
  <div id="register">
    
    <div class="register-area pt-100 pb-70">
      <div class="container">

        <!-- otp code start -->
        <div class="register" style="max-width:550px;" v-if="checkAlumniRegisterOrNotArea">
          <div class="mb-3">
            <label for="student_id" class="form-label">Student Id</label>
            <div class="d-flex">
              <input id="student_id" type="text" class="form-control mr-20" v-model="studentId" @input="formatStudentId">
              <button @click="checkAlumniRegisterOrNotByStudentId" type="button" class="btn btn-sm btn-primary" style="width:100px;"> <i class="fa fa-check-circle"></i> Check</button>
            </div>
          </div>

          <div v-if="showVerifyCheckBoxArea">
            <span class="fw-bold">varified by: </span>
            <span>
              <div class="form-check form-check-inline">
                <input @click="checkMobileRadioButton" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                <label class="form-check-label" for="inlineRadio1">Mobile</label>
              </div>
              <div class="form-check form-check-inline">
                <input @click="checkEmailRadioButton" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                <label class="form-check-label" for="inlineRadio2">Email</label>
              </div>
            </span>
          </div>

          <div v-if="showMobileInputArea" class="mt-4">
            <div class="mb-3">
              <label for="mobile" class="form-label">Mobile Number ({{ hashMobile }})</label>
              <input @input="matchHashMobileAndInputMobile(withoutHashMobile)" v-model="mobile" type="text" class="form-control" placeholder="Enter mobile number">
            </div>
            <button v-if="showSubmitButton" @click="sendOtpByMobile" class="btn btn-sm btn-primary">Submit</button>
          </div>

          <div v-if="showEmailCheckBoxArea" class="mt-4">
            <div class="form-check form-check-inline">
              <input @click="checkEwuEmailRadioButton" class="form-check-input" type="radio" name="inlineRadioOptionss" id="inlineRadio3" value="option3">
              <label class="form-check-label" for="inlineRadio3">Ewu Email</label>
            </div>

            <div class="form-check form-check-inline">
              <input @click="checkStudentPersonalEmailRadioButton" class="form-check-input" type="radio" name="inlineRadioOptionss" id="inlineRadio4" value="option4">
              <label class="form-check-label" for="inlineRadio4">Student Personal Email</label>
            </div>
          </div>

          <div v-if="showEwuEmailInputArea" class="mt-4">
            <div class="mb-3">
              <label for="ewuEmail" class="form-label">Ewu Email</label>
              <input @input="matchHashEwuEmailAndInputEmail(withoutHashEwuEmail)" v-model="ewuEmail" type="email" class="form-control" placeholder="Enter ewu email">
            </div>
            <button @click="sendOtpByEwuEmail" v-if="showSubmitButton" class="btn btn-sm btn-primary">Submit</button>
          </div>

          <div v-if="showStudentPersonalEmailInputArea" class="mt-4">
            <div class="mb-3">
              <label for="studentPersonalEmail" class="form-label">Student Personal Email ({{ hashStudentPersonalEmail }})</label>
              <input @input="matchHashStudentPersonalEmailAndInputEmail(withoutHashStudentPersonalEmail)" v-model="studentPersonalEmail" type="email" class="form-control" placeholder="Enter personal email">
            </div>
            <button @click="sendOtpByStudentPersonalEmail" v-if="showSubmitButton" class="btn btn-sm btn-primary">Submit</button>
          </div>

          <div class="mt-4" v-if="manualRegisterButton">
            <p style="color: blue;">If your email and mobile number are no longer in use, click the button below for manual registration.</p>
            <button class="btn btn-sm bg-primary text-white" @click="manualRegisterFormShow">Manual registration</button>
          </div>
        </div>

        <div class="register" style="max-width:550px;" v-if="otpCheckArea">
          <div class="mb-3">
            <label for="otp" class="form-label">Please enter your OTP</label>
            <div class="d-flex">
              <input v-model="otp" type="text" class="form-control mr-20">
              <button @click="verifyOtp" type="button" class="btn btn-sm btn-primary" style="width:100px;"> <i class="fa fa-check-circle"></i> Verify</button>
            </div>
          </div>
        </div>
        <!-- otp code end -->

        <!-- Api registration form start -->
        <div class="register" v-if="registerFormShowMode">
          <h4>
            <div class="row mb-3">
              <div class="col-sm-4">Register</div>
                <div class="col-sm-8 d-flex flex-row-reverse">
                  <!-- <button @click="getStudentAluminiInfoByStudentIdForFillRegisterForm(ewuStudentId)" type="button" class="form-control btn btn-sm btn-primary mlr-5" style="width:100px; height:29px;"><i class="fa fa-plus"></i>Fetch data</button> -->
                  <button @click="getStudentAluminiInfoByStudentIdForFillRegisterForm(ewuStudentId)" type="button" class="form-control btn btn-sm btn-primary mlr-5" style="height:29px;"><i class="fa fa-plus"></i>Fetch data</button>
                  <input v-model="ewuStudentId" type="text" class="form-control" style="height:29px;" placeholder="Student ID" readonly/>
                </div>
            </div>
          </h4>

          <form @submit.prevent="store()">
            <div v-if="form.progress" class="text-center">
              Progress: {{ form.progress.percentage }}%
            </div>
            <AlertError :form="form" message="There were some problems with your input." />

            <div class="row mb-3">
              <label for="ewu_id_no" class="col-sm-4 col-form-label">EWU id number</label>
              <div class="col-sm-8">
                <input v-model="form.ewu_id_no" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Your University ID" readonly/>
                <HasError :form="form" field="ewu_id_no"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="title" class="col-sm-4 col-form-label">Title</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.title" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Add Title"/>
                <HasError :form="form" field="title"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="first_name" class="col-sm-4 col-form-label">First Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.first_name" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your first name"/>
                <HasError :form="form" field="first_name"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="middle_name" class="col-sm-4 col-form-label">Middle Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.middle_name" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your middle name"/>
                <HasError :form="form" field="middle_name"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="last_name" class="col-sm-4 col-form-label">Last Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.last_name" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your last name"/>
                <HasError :form="form" field="last_name"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="personal_email" class="col-sm-4 col-form-label">Personal E-mail Address</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.personal_email" type="email" class="form-control" id="personal_email"
                  placeholder="Format: personal@example.com"/>
                <HasError :form="form" field="personal_email"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="university_email" class="col-sm-4 col-form-label">University E-mail Address</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.university_email" type="email" class="form-control" id="university_email"
                  placeholder="Format: university@example.com"/>
                <HasError :form="form" field="university_email"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="company_email" class="col-sm-4 col-form-label">Company E-mail Address</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.company_email" type="email" class="form-control" id="company_email"
                  placeholder="Format: company@example.com"/>
                <HasError :form="form" field="company_email"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="personal_contact_number" class="col-sm-4 col-form-label">Contact Number</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.personal_contact_number" type="text" class="form-control shadow-lg bg-white rounded" id="personal_contact_number" placeholder="Format: 01xxxxxxxxx"/>
                <HasError :form="form" field="personal_contact_number"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="nid" class="col-sm-4 col-form-label">NID</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.nid" type="text" class="form-control shadow-lg bg-white rounded" id="nid" placeholder="Enter your National Identity Card Number"/>
                <HasError :form="form" field="nid" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="dob" class="col-sm-4 col-form-label">Date of Birth</label>
              <div class="col-sm-8 m-auto">
                <!-- <input v-model="form.dob" type="date" class="form-control shadow-lg bg-white rounded" placeholder="Format: DD-MM-YYYY" /> -->
                <input v-model="form.dob" type="text" class="form-control shadow-lg bg-white rounded" id="dob" placeholder="Format: DD-MM-YYYY"/>
                <HasError :form="form" field="dob"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="gender" class="col-sm-4 col-form-label">Gender</label>
              <div class="col-sm-8 m-auto">
                <!-- <select v-model="form.gender" class="form-select form-control shadow-lg rounded">
                  <option value="">Select One</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select> -->
                <input v-model="form.gender" type="text" class="form-control shadow-lg bg-white rounded" id="gender" placeholder="Male / Female"/>
                <HasError :form="form" field="gender"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="blood_group" class="col-sm-4 col-form-label">Blood Group</label>
              <div class="col-sm-8 m-auto">
                <!-- <select v-model="form.blood_group" class="form-select form-control shadow-lg rounded">
                  <option value="">Select One</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="Unknown">Unknown</option>
                </select> -->
                <input v-model="form.blood_group" type="text" class="form-control shadow-lg bg-white rounded" id="blood-group" placeholder="Blood Group"/>
                <HasError :form="form" field="blood_group"/>
              </div>
            </div>

            <!-- <div class="row mb-3">
              <label for="department_id" class="col-sm-4 col-form-label">Department</label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.department_id" class="form-control form-select shadow-lg rounded">
                    <option value="">Select One</option>
                    <option v-for="(item,index) in departments" :value="item.id">{{item.title}}</option>
                </select>
                <HasError :form="form" field="department_id" />
              </div>
            </div> -->

            <div class="row mb-3">
              <label for="department_name" class="col-sm-4 col-form-label">Department</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.department_name" type="text" class="form-control shadow-lg bg-white rounded" id="department-name" placeholder="Department"/>
                <HasError :form="form" field="department_name"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="program_type" class="col-sm-4 col-form-label">Program Type</label>
              <div class="col-sm-8 m-auto">
                <!-- <select v-model="form.program_type" class="form-select form-control shadow-lg rounded">
                  <option value="">Select One</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Diploma">Diploma</option>
                </select> -->
                <input v-model="form.program_type" type="text" class="form-control shadow-lg bg-white rounded" id="program-type" placeholder="Program Type"/>
                <HasError :form="form" field="program_type"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="program_name" class="col-sm-4 col-form-label">Program Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.program_name" type="text" class="form-control shadow-lg bg-white rounded" id="program-name" placeholder="Program Name"/>
                <HasError :form="form" field="program_name"/>
              </div>
            </div>

            <!-- <div class="row mb-3">
              <label for="passing_year" class="col-sm-4 col-form-label">Passing Semester And Year</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.passing_year" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Format: Spring 2021, Fall 2020" />
                <HasError :form="form" field="passing_year" />
              </div>
            </div> -->

            <div class="row mb-3">
              <label for="passing_year" class="col-sm-4 col-form-label">Passing Year</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.passing_year" type="text" class="form-control shadow-lg bg-white rounded" id="passing-year" placeholder="Passing Year" />
                <HasError :form="form" field="passing_year"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="passing_semester" class="col-sm-4 col-form-label">Passing Semester</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.passing_semester" type="text" class="form-control shadow-lg bg-white rounded" id="passing-semester" placeholder="Passing Semester"/>
                <HasError :form="form" field="passing_semester"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="convocation_year" class="col-sm-4 col-form-label">Convocation Year</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.convocation_year" type="text" class="form-control shadow-lg bg-white rounded" id="convocation-year" placeholder="Enter your convocation year"/>
                <HasError :form="form" field="convocation_year"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="organization" class="col-sm-4 col-form-label">Organization Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.organization" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter organization name"/>
                <HasError :form="form" field="organization"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="designation_department" class="col-sm-4 col-form-label">Designation / Department</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.designation_department" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Designation or Department"/>
                <HasError :form="form" field="designation_department"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="occupation" class="col-sm-4 col-form-label">Occupation</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.occupation" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Your Occupation"/>
                <HasError :form="form" field="occupation"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="doj" class="col-sm-4 col-form-label">Date of Join</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.doj" type="date" class="form-control shadow-lg bg-white rounded"
                  placeholder="Format: DD-MM-YYYY"/>
                <HasError :form="form" field="doj"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="linkedin_profile_link" class="col-sm-4 col-form-label">Linkedin Profile Link</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.linkedin_profile_link" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Linkedin Profile Link"/>
                <HasError :form="form" field="linkedin_profile_link"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="image" class="col-sm-4 col-form-label">Image</label>
              <div class="col-sm-8 m-auto">
                <input @change="onImageChange" name="image" type="file" class="form-control shadow-lg bg-white rounded"
                  id="file"/>
                <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="">
                <HasError :form="form" field="image"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="username" class="col-sm-4 col-form-label">Username</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.username" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter username"/>
                <HasError :form="form" field="username"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="email" class="col-sm-4 col-form-label">Login E-mail</label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.email" class="form-select form-control shadow-lg rounded" placeholder="Choose One" @click="getEmails()">
                  <option v-for="item in emails" :value="item">{{ item }}</option>
                </select>
                <HasError :form="form" field="email"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="password" class="col-sm-4 col-form-label">Password</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.password" type="password" name="password"
                  class="form-control shadow-lg bg-white rounded" placeholder="Enter password" />
                <HasError :form="form" field="password"/>
              </div>
            </div>

            <div class="row mb-3">
              <label class="col-sm-4 col-form-label"></label>
              <div class="col-sm-8 m-auto">
                <div class="tags-and-share border-0 mb-0 pb-0">
                    <div class="row align-items-center">
                      <div class="col-lg-6 col-md-6">
                        <button type="submit" class="default-btn rounded-pill">
                          Submit
                        </button>
                      </div>

                      <div class="col-lg-6 col-md-6">
                        <div class="share">
                          <ul>
                              <li><span>Share :</span></li>

                              <li>
                                <!-- <a href="https://www.facebook.com" target="_blank"><i class="flaticon-facebook"></i></a> -->
                                <ShareNetwork
                                  network="facebook"
                                  url="https://alumni.ewubd.edu/register"
                                  title="Alumni Registration"
                                  description="Alumni Registration"
                                  quote="Thank you"
                                  hashtags="Register"
                                >
                                  <i class="flaticon-facebook"></i>
                                </ShareNetwork>
                              </li>

                              <li>
                                <ShareNetwork
                                  network="linkedin"
                                  url="https://alumni.ewubd.edu/register"
                                  title="Alumni Registration"
                                  description="Alumni Registration"
                                  quote="Thank you"
                                  hashtags="Register"
                                >
                                  <i class="flaticon-linkedin"></i>
                                </ShareNetwork>
                              </li>

                              <li>
                                <ShareNetwork
                                  network="twitter"
                                  url="https://alumni.ewubd.edu/register"
                                  title="Alumni Registration"
                                  description="Alumni Registration"
                                  quote="Thank you"
                                  hashtags="Register"
                                >
                                  <i class="flaticon-twitter"></i>
                                </ShareNetwork>
                              </li>

                              <!-- <li>
                                <ShareNetwork
                                  network="email"
                                  url="https://alumni.ewubd.edu/register"
                                  title="Graduate profile"
                                  description="Graduate registration"
                                  quote="Thank you"
                                  hashtags="graduate,alumni"
                                >
                                  <i class="flaticon-email"></i>
                                </ShareNetwork>
                              </li> -->
                          </ul>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <!-- <div class="col-md-12 text-center">
              <button type="submit" class="default-btn">
                Submit<span></span>
              </button>
            </div> -->
          </form>
        </div>
        <!-- Api registration form end -->

        <!-- Manual registration form start -->
        <div class="register" v-if="manualRegisterFormShowMode">
          <h4>
            <div class="row mb-3">
              <div class="col-sm-4">Register</div>
            </div>
          </h4>
          <form @submit.prevent="manualStore()">
            <div v-if="form.progress" class="text-center">
              Progress: {{ form.progress.percentage }}%
            </div>
            <AlertError :form="form" message="There were some problems with your input." />

            <div class="row mb-3">
              <label for="ewu_id_no" class="col-sm-4 col-form-label">EWU id number <span class="text-danger">*</span></label>
              <div class="col-sm-8">
                <input v-model="form.ewu_id_no" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Your University ID" readonly/>
                <HasError :form="form" field="ewu_id_no"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="title" class="col-sm-4 col-form-label">Title</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.title" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Add Title"/>
                <HasError :form="form" field="title"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="first_name" class="col-sm-4 col-form-label">First Name <span class="text-danger">*</span></label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.first_name" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your first name"/>
                <HasError :form="form" field="first_name"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="middle_name" class="col-sm-4 col-form-label">Middle Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.middle_name" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your middle name"/>
                <HasError :form="form" field="middle_name"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="last_name" class="col-sm-4 col-form-label">Last Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.last_name" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your last name"/>
                <HasError :form="form" field="last_name"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="personal_email" class="col-sm-4 col-form-label"> Personal E-mail Address <span class="text-danger">*</span></label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.personal_email" type="email" class="form-control" placeholder="Format: personal@example.com"/>
                <HasError :form="form" field="personal_email"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="university_email" class="col-sm-4 col-form-label">University E-mail Address <span class="text-danger">*</span></label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.university_email" type="email" class="form-control" placeholder="Format: university@example.com"/>
                <HasError :form="form" field="university_email"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="company_email" class="col-sm-4 col-form-label">Company E-mail Address</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.company_email" type="email" class="form-control" placeholder="Format: company@example.com"/>
                <HasError :form="form" field="company_email"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="personal_contact_number" class="col-sm-4 col-form-label">Contact Number <span class="text-danger">*</span></label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.personal_contact_number" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Format: 01xxxxxxxxx"/>
                <HasError :form="form" field="personal_contact_number"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="nid" class="col-sm-4 col-form-label">NID</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.nid" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your National Identity Card Number"/>
                <HasError :form="form" field="nid"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="dob" class="col-sm-4 col-form-label">Date of Birth</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.dob" type="date" class="form-control shadow-lg bg-white rounded" placeholder="Format: DD-MM-YYYY" />
                <HasError :form="form" field="dob"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="gender" class="col-sm-4 col-form-label">Gender</label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.gender" class="form-select form-control shadow-lg rounded">
                  <option value="">Select One</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <HasError :form="form" field="gender"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="blood_group" class="col-sm-4 col-form-label">Blood Group</label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.blood_group" class="form-select form-control shadow-lg rounded">
                  <option value="">Select One</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="Unknown">Unknown</option>
                </select>
                <HasError :form="form" field="blood_group"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="department_name" class="col-sm-4 col-form-label">Department <span class="text-danger">*</span></label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.department_name" class="form-control form-select shadow-lg rounded">
                    <option value="">Select One</option>
                    <option v-for="(item,index) in departments" :value="item.title">{{item.title}}</option>
                </select>
                <HasError :form="form" field="department_name"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="program_type" class="col-sm-4 col-form-label">Program Type <span class="text-danger">*</span></label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.program_type" type="text" class="form-control shadow-lg bg-white rounded" placeholder="Program Type"/>
                <HasError :form="form" field="program_type"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="program_name" class="col-sm-4 col-form-label">Program Name <span class="text-danger">*</span></label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.program_name" type="text" class="form-control shadow-lg bg-white rounded" placeholder="Program Name"/>
                <HasError :form="form" field="program_name"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="passing_year" class="col-sm-4 col-form-label">Passing Year</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.passing_year" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Passing Year"/>
                <HasError :form="form" field="passing_year"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="passing_semester" class="col-sm-4 col-form-label">Passing Semester</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.passing_semester" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Passing Semester"/>
                <HasError :form="form" field="passing_semester"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="convocation_year" class="col-sm-4 col-form-label">Convocation Year</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.convocation_year" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your convocation year"/>
                <HasError :form="form" field="convocation_year"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="organization" class="col-sm-4 col-form-label">Organization Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.organization" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter organization name"/>
                <HasError :form="form" field="organization"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="designation_department" class="col-sm-4 col-form-label">Designation / Department</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.designation_department" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Designation or Department"/>
                <HasError :form="form" field="designation_department"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="occupation" class="col-sm-4 col-form-label">Occupation</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.occupation" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Your Occupation"/>
                <HasError :form="form" field="occupation"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="doj" class="col-sm-4 col-form-label">Date of Join</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.doj" type="date" class="form-control shadow-lg bg-white rounded"
                  placeholder="Format: DD-MM-YYYY"/>
                <HasError :form="form" field="doj"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="linkedin_profile_link" class="col-sm-4 col-form-label">Linkedin Profile Link</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.linkedin_profile_link" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Linkedin Profile Link" />
                <HasError :form="form" field="linkedin_profile_link"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="image" class="col-sm-4 col-form-label">Image</label>
              <div class="col-sm-8 m-auto">
                <input @change="onImageChange" name="image" type="file" class="form-control shadow-lg bg-white rounded"
                  id="file"/>
                <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="">
                <HasError :form="form" field="image"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="username" class="col-sm-4 col-form-label">Username</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.username" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter username"/>
                <HasError :form="form" field="username"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="email" class="col-sm-4 col-form-label">Login E-mail <span class="text-danger">*</span></label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.email" class="form-select form-control shadow-lg rounded" placeholder="Choose One" @click="getEmails()">
                  <option v-for="item in emails" :value="item">{{ item }}</option>
                </select>
                <HasError :form="form" field="email"/>
              </div>
            </div>

            <div class="row mb-3">
              <label for="password" class="col-sm-4 col-form-label">Password <span class="text-danger">*</span></label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.password" type="password" name="password"
                  class="form-control shadow-lg bg-white rounded" placeholder="Enter password"/>
                <HasError :form="form" field="password"/>
              </div>
            </div>

            <div class="row mb-3">
              <label class="col-sm-4 col-form-label"></label>
              <div class="col-sm-8 m-auto">
                <div class="tags-and-share border-0 mb-0 pb-0">
                    <div class="row align-items-center">
                      <div class="col-lg-6 col-md-6">
                        <button type="submit" class="default-btn rounded-pill">
                          Submit
                        </button>
                      </div>

                      <div class="col-lg-6 col-md-6">
                        <div class="share">
                          <ul>
                              <li><span>Share :</span></li>

                              <li>
                                <ShareNetwork
                                  network="facebook"
                                  url="https://alumni.ewubd.edu/register"
                                  title="Alumni Registration"
                                  description="Alumni Registration"
                                  quote="Thank you"
                                  hashtags="Register"
                                >
                                  <i class="flaticon-facebook"></i>
                                </ShareNetwork>
                              </li>

                              <li>
                                <ShareNetwork
                                  network="linkedin"
                                  url="https://alumni.ewubd.edu/register"
                                  title="Alumni Registration"
                                  description="Alumni Registration"
                                  quote="Thank you"
                                  hashtags="Register"
                                >
                                  <i class="flaticon-linkedin"></i>
                                </ShareNetwork>
                              </li>

                              <li>
                                <ShareNetwork
                                  network="twitter"
                                  url="https://alumni.ewubd.edu/register"
                                  title="Alumni Registration"
                                  description="Alumni Registration"
                                  quote="Thank you"
                                  hashtags="Register"
                                >
                                  <i class="flaticon-twitter"></i>
                                </ShareNetwork>
                              </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <!-- Manual registration form end -->
      </div>
    </div>





    <!-- <div class="register-area pt-100 pb-70">
      <div class="container">
        <div class="register">
          <h3>Register</h3>
          <form @submit.prevent="store()">
            <div v-if="form.progress" class="text-center">
              Progress: {{ form.progress.percentage }}%
            </div>
            <AlertError :form="form" message="There were some problems with your input." />

            <div class="row mb-3">
              <label for="ewu_id_no" class="col-sm-4 col-form-label">EWU id number</label>
              <div class="col-sm-8">
                <input v-model="form.ewu_id_no" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Your University ID" />
                <HasError :form="form" field="ewu_id_no" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="title" class="col-sm-4 col-form-label">Title</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.title" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Add Title" />
                <HasError :form="form" field="title" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="first_name" class="col-sm-4 col-form-label">First Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.first_name" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your first name" />
                <HasError :form="form" field="first_name" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="middle_name" class="col-sm-4 col-form-label">Middle Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.middle_name" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your middle name" />
                <HasError :form="form" field="middle_name" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="last_name" class="col-sm-4 col-form-label">Last Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.last_name" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your last name" />
                <HasError :form="form" field="last_name" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="personal_email" class="col-sm-4 col-form-label"> Personal E-mail Address</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.personal_email" type="email" class="form-control" id="personal_email"
                  placeholder="Format: personal@example.com" />
                <HasError :form="form" field="personal_email" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="university_email" class="col-sm-4 col-form-label">University E-mail Address</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.university_email" type="email" class="form-control" id="university_email"
                  placeholder="Format: university@example.com"  />
                <HasError :form="form" field="university_email" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="company_email" class="col-sm-4 col-form-label">Company E-mail Address</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.company_email" type="email" class="form-control" id="company_email"
                  placeholder="Format: company@example.com"  />
                <HasError :form="form" field="company_email" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="personal_contact_number" class="col-sm-4 col-form-label">Contact Number</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.personal_contact_number" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Format: 01xxxxxxxxx" />
                <HasError :form="form" field="personal_contact_number" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="nid" class="col-sm-4 col-form-label">NID</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.nid" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your National Identity Card Number" />
                <HasError :form="form" field="nid" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="dob" class="col-sm-4 col-form-label">Date of Birth</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.dob" type="date" class="form-control shadow-lg bg-white rounded"
                  placeholder="Format: DD-MM-YYYY" />
                <HasError :form="form" field="dob" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="gender" class="col-sm-4 col-form-label">Gender</label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.gender" class="form-select form-control shadow-lg rounded">
                  <option value="">Select One</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <HasError :form="form" field="gender" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="blood_group" class="col-sm-4 col-form-label">Blood Group</label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.blood_group" class="form-select form-control shadow-lg rounded">
                  <option value="">Select One</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <HasError :form="form" field="blood_group" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="department_id" class="col-sm-4 col-form-label">Department</label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.department_id" class="form-control form-select shadow-lg rounded">
                    <option value="">Select One</option>
                    <option v-for="(item,index) in departments" :value="item.id">{{item.title}}</option>
                </select>
                <HasError :form="form" field="department_id" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="program" class="col-sm-4 col-form-label">Program</label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.program" class="form-select form-control shadow-lg rounded">
                  <option value="">Select One</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Diploma">Diploma</option>
                </select>
                <HasError :form="form" field="program" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="passing_year" class="col-sm-4 col-form-label">Passing Semester And Year</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.passing_year" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Format: Spring 2021, Fall 2020" />
                <HasError :form="form" field="passing_year" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="convocation_year" class="col-sm-4 col-form-label">Convocation Year</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.convocation_year" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter your convocation year" />
                <HasError :form="form" field="convocation_year" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="organization" class="col-sm-4 col-form-label">Organization Name</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.organization" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter organization name" />
                <HasError :form="form" field="organization" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="designation_department" class="col-sm-4 col-form-label">Designation / Department</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.designation_department" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Designation or Department" />
                <HasError :form="form" field="designation_department" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="occupation" class="col-sm-4 col-form-label">Occupation</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.occupation" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Your Occupation" />
                <HasError :form="form" field="occupation" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="doj" class="col-sm-4 col-form-label">Date of Join</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.doj" type="date" class="form-control shadow-lg bg-white rounded"
                  placeholder="Format: DD-MM-YYYY" />
                <HasError :form="form" field="doj" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="linkedin_profile_link" class="col-sm-4 col-form-label">Linkedin Profile Link</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.linkedin_profile_link" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Linkedin Profile Link" />
                <HasError :form="form" field="linkedin_profile_link" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="image" class="col-sm-4 col-form-label">Image</label>
              <div class="col-sm-8 m-auto">
                <input @change="onImageChange" name="image" type="file" class="form-control shadow-lg bg-white rounded"
                  id="file" />
                <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="">
                <HasError :form="form" field="image" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="username" class="col-sm-4 col-form-label">Username</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.username" type="text" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter username" />
                <HasError :form="form" field="username" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="email" class="col-sm-4 col-form-label">Login E-mail</label>
              <div class="col-sm-8 m-auto">
                <select v-model="form.email" class="form-select form-control shadow-lg rounded" placeholder="Choose One" @click="getEmails()">
                  <option v-for="item in emails" :value="item">{{ item }}</option>
                </select>
                <HasError :form="form" field="email" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="password" class="col-sm-4 col-form-label">Password</label>
              <div class="col-sm-8 m-auto">
                <input v-model="form.password" type="password" name="password"
                  class="form-control shadow-lg bg-white rounded" placeholder="Enter password" />
                <HasError :form="form" field="password" />
              </div>
            </div>

            <div class="row mb-3">
              <label class="col-sm-4 col-form-label"></label>
              <div class="col-sm-8 m-auto">
                <div class="tags-and-share border-0 mb-0 pb-0">
                    <div class="row align-items-center">
                      <div class="col-lg-6 col-md-6">
                        <button type="submit" class="default-btn rounded-pill">
                          Submit
                        </button>
                      </div>

                      <div class="col-lg-6 col-md-6">
                        <div class="share">
                          <ul>
                              <li><span>Share :</span></li>

                              <li>
                                <ShareNetwork
                                  network="facebook"
                                  url="http://alumni.fscd.xyz/register"
                                  title="Graduate profile"
                                  description="Graduate registration"
                                  quote="Thank you"
                                  hashtags="graduate,alumni"
                                >
                                  <i class="flaticon-facebook"></i>
                                </ShareNetwork>
                              </li>

                              <li>
                                <ShareNetwork
                                  network="linkedin"
                                  url="http://alumni.fscd.xyz/register"
                                  title="Graduate profile"
                                  description="Graduate registration"
                                  quote="Thank you"
                                  hashtags="graduate,alumni"
                                >
                                  <i class="flaticon-linkedin"></i>
                                </ShareNetwork>
                              </li>

                              <li>
                                <ShareNetwork
                                  network="twitter"
                                  url="http://alumni.fscd.xyz/register"
                                  title="Graduate profile"
                                  description="Graduate registration"
                                  quote="Thank you"
                                  hashtags="graduate,alumni"
                                >
                                  <i class="flaticon-twitter"></i>
                                </ShareNetwork>
                              </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> -->

    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from '../../store';
const store = useStore();
import moment from 'moment';
import { useHead } from '@vueuse/head';
import Form from "vform";
import Cookies from 'js-cookie'
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "Register",
  components: {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      moment: moment,
      contactUs: '',
      imagePreview: "",
      valueFrom: "alumni_create",

      form: new Form({
        id: "",
        studentId: '',
        // basic info
        ewu_id_no: "",
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        nid: "",
        dob: "",
        gender: "",
        blood_group: "",
        about: "",
        image: "",

        // contact info
        personal_email: "",
        university_email: "",
        company_email: "",
        personal_contact_number: "",
        official_contact_number: "",
        facebook_profile_link: "",
        linkedin_profile_link: "",

        // address info
        country_id: "",
        division_id: "",
        district_id: "",

        // educational info
        department_id: "",
        department_name: "",
        program_id: "",
        program_type: "",
        program_name: "",
        passing_year: "",
        passing_semester: "",
        convocation_year: "",

        // professional info
        organization: "",
        designation_department: "",
        occupation: "",
        doj: "",
        experience: "",
        industry: "",

        // login info
        email: "",
        username: "",
        password: ""
      }),

      departments: [],
      emails:[],

      // otp code start
      checkAlumniRegisterOrNotArea: true,
      showVerifyCheckBoxArea: false,
      showMobileInputArea: false,
      showEmailCheckBoxArea: false,
      showEwuEmailInputArea: false,
      showStudentPersonalEmailInputArea: false,

      mobile: '',
      hashMobile: '',
      withoutHashMobile: '',

      ewuEmail: '',
      withoutHashEwuEmail: '',

      studentPersonalEmail: '',
      hashStudentPersonalEmail: '',
      withoutHashStudentPersonalEmail: '',

      showSubmitButton: false,
      otp: '',

      otpCheckArea: false,
      registerFormShowMode: false,
      ewuStudentId: '',
      ewuStudentData: '',
      // otp code end

      // manual registration code start
      manualRegisterButton: false,
      manualRegisterFormShowMode: false,
      // manual registration code end
    };
  },

  mounted() {
    this.getDependentData();

  },

  created() {
    const url = window.location.pathname;
    axios.get(`${this.backendUrl}/get-seo-data`, { params: { site: 'alumni', page_url: url } })
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.data != null) {
          useHead({ title: response.data.data.title });
        } else {
          useHead({ title: 'Alumni | EWU' });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    formatStudentId() {
      var input = document.getElementById("student_id");
      var str = input.value;
      str = str.replace("-","");
      str = str.replace(/-/g,""); // Replace all occurrences of "-" with an empty string
      if (str.length > 4) {
        str = str.substring(0,4) + "-" + str.substring(4);
        if (str.length > 6) {
          str = str.substring(0,6) + "-" + str.substring(6);
          if (str.length > 9) {
            str = str.substring(0,9) + "-" + str.substring(9);
          }
        }
      }
      input.value = str
    },

    getEmails() {
      const emailFields = ['personal_email', 'university_email', 'company_email'];
      for (let i = 0; i < emailFields.length; i++) {
        const email = this.form[emailFields[i]];
        this.emails[i] = email.length > 0 ? email : null;
      }
    
      // if (Number(this.form.personal_email.length) > 0) {
      //   // this.emails.push(this.form.personal_email);
      //   this.emails[0] = this.form.personal_email;
      // } else {
      //   this.emails[0] = null;
      // }

      // if (Number(this.form.university_email.length) > 0) {
      //   // this.emails.push(this.form.university_email);
      //   this.emails[1] = this.form.university_email;
      // } else {
      //   this.emails[1] = null;
      // }

      // if (Number(this.form.company_email.length) > 0) {
      //   // this.emails.push(this.form.company_email);
      //   this.emails[2] = this.form.company_email;
      // } else {
      //   this.emails[2] = null;
      // }
    },

    getDependentData() {
      if (Cookies.get('authIdCookie') && Cookies.get('jobUserLoggedInToken')){
        axios.get(`${this.backendUrl}/user/info`,{
          params:{
            token:Cookies.get('alumniLoggedInTokenCookie') ? Cookies.get('alumniLoggedInTokenCookie').split('|')[1] : Cookies.get('jobUserLoggedInToken').split('|')[1],
          }
        })
        .then((response) => {
          if (!response.data.data.alumni && response.data.data.employment_status === 'Alumni'){
            this.checkAlumniRegisterOrNotArea = false;
            this.registerFormShowMode = true;

            this.form.ewu_id_no = response.data.data.resume.ewu_id_no;
            this.form.first_name = response.data.data.resume.first_name;
            this.form.middle_name = response.data.data.resume.middle_name;
            this.form.last_name = response.data.data.resume.last_name;
            this.form.university_email = response.data.data.resume.email;
            this.form.personal_contact_number = response.data.data.resume.personal_number;
            this.form.nid = response.data.data.nid;
            this.form.dob = moment(response.data.data.resume.birthdate).format('DD/MM/YYYY');
            this.form.gender = response.data.data.resume.gender;
            this.form.blood_group = response.data.data.resume.blood_group;
            this.form.username = response.data.data.username;
          } else {
            this.checkAlumniRegisterOrNotArea = true;
            this.registerFormShowMode = false;
          }
        })
        .catch((e) => {
          this.$Progress.fail();
        });
      }

      axios.get(`${this.backendUrl}/department`)
        .then((response) => {
          this.departments = response.data.data;
          // console.log(this.departments);
        })
        .catch((e) => {
          this.$Progress.fail();
        });
    },

    onImageChange(e){
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
        this.imagePreview = reader.result;
        this.form.image = reader.result;
      }
      reader.readAsDataURL(file);
    },

    store() {
      this.$Progress.start();
      this.form.busy = true;
      this.form.post(`${this.backendUrl}/alumni/register`, {
        params: {
          valueFrom: this.valueFrom,
          auth_id:Cookies.get('authIdCookie')
        },
      })
        .then((response) => {
          if (this.form.successful) {
            this.$Progress.finish();
            toast.success(response.data.message);
            this.form.reset()
            $('#file').val('')
            this.imagePreview = ''
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

    manualStore() {
      this.$Progress.start();
      this.form.busy = true;
      this.form.post(`${this.backendUrl}/alumni/register/manually`, {
        params: {
          valueFrom: "manual_alumni_create",
          auth_id:Cookies.get('authIdCookie')
        },
      })
      .then((response) => {
        if (this.form.successful) {
          this.$Progress.finish();
          this.form.reset()
          $('#file').val('')
          this.imagePreview = ''

          axios.get(`${this.backendUrl}/contactUs`)
          .then((response) => {
            this.contactUs = response.data.data[0];

            let address = this.contactUs.address || 'Address not available';
            let email = this.contactUs.email || 'Email not available';
            let contactNo = this.contactUs.phone || 'Contact number not available';

            this.$swal.fire({
              title: "Thanks for registering with the East West University Student Welfare Department",
              html: `<p>We’ve received your request to sign up for our system. Please allow us some time to verify your details manually. Once approved or rejected, you will be notified via email or SMS. If you have urgent needs, feel free to contact us at the below contact details:</p>
                  <div style="font-weight: bold;">Address:</div>
                  <div>${address}</div>
                  <div style="font-weight: bold;">Email:</div>
                  <div>${email}</div>
                  <div style="font-weight: bold;">Contact No:</div>
                  <div>${contactNo}</div>`,
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
              customClass: {
                popup: 'custom-width', // Add your custom class here
              }
            });
          })
          .catch((e) => {
            console.log(e);

            let address = 'Address not available';
            let email = 'Email not available';
            let contactNo = 'Contact number not available';

            this.$swal.fire({
              title: "Thanks for registering with the East West University Student Welfare Department",
              html: `<p>We’ve received your request to sign up for our system. Please allow us some time to verify your details manually. Once approved or rejected, you will be notified via email or SMS. If you have urgent needs, feel free to contact us at the below contact details:</p>
                  <div style="font-weight: bold;">Address:</div>
                  <div>${address}</div>
                  <div style="font-weight: bold;">Email:</div>
                  <div>${email}</div>
                  <div style="font-weight: bold;">Contact No:</div>
                  <div>${contactNo}</div>`,
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
              customClass: {
                popup: 'custom-width', // Add your custom class here
              }
            });
          });




          // axios.get(`${this.backendUrl}/contactUs`)
          // .then((response) => {
          //     this.contactUsAddress = response.data.data[0].address;
          //     this.contactUsEmail = response.data.data[0].email;
          //     this.contactUsPhone = response.data.data[0].phone;
          // })
          // .catch((e) => {console.log(e);});

          // let contactUsAddressHtml = this.contactUsAddress  || 'Address not available';
          // let contactUsEmailHtml = this.contactUsEmail || 'Email not available';
          // let contactUsContactNoHtml = this.contactUsPhone || 'Contact number not available';
          // this.$swal
          // .fire({
          //   title: "Thanks for registering with the East West University Student Welfare Department",
          //   html: `<p>We’ve received your request to sign up for our system. Please allow us some time to verify your details manually. Once approved or rejected, you will be notified via email or SMS. If you have urgent needs, feel free to contact us at the below contact details:</p>
          //     <div style="font-weight: bold;">Address:</div>
          //     <div>${contactUsAddressHtml}</div>
          //     <div style="font-weight: bold;">Email:</div>
          //     <div>${contactUsEmailHtml}</div>
          //     <div style="font-weight: bold;">Contact No:</div>
          //     <div>${contactUsContactNoHtml}</div>`,
            
          //   icon: "success",
          //   showCancelButton: false,
          //   confirmButtonColor: "#3085d6",
          //   cancelButtonColor: "#d33",
          //   confirmButtonText: "OK",
          //   customClass: {
          //     popup: 'custom-width', // Add your custom class here
          //   }
          // })


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

    // Api registration optimize code start
    checkAlumniRegisterOrNotByStudentId() {
      let studentId = $('#student_id').val();
      this.ewuStudentId = studentId;
      axios.post(`${this.backendUrl}/check-alumni-by-student-id/${studentId}`)
      .then((response) => {
        if (response.data.status == true) {
          this.showVerifyCheckBoxArea = false;
          this.showMobileInputArea = false;
          this.showEmailCheckBoxArea = false;
          toast.success(response.data.message);
        } else if (response.data.status == false) {
          this.checkAuthenticateOrNot(studentId);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },

    checkAuthenticateOrNot(studentId) {
      axios.post('https://api.ewubd.edu/users/authenticate', {
        "username": "Perky_Rabbit",
        "password" : "aR-YER=7$V@R7yt"
      })
      .then((response) => {
        this.getStudentAluminiInfoByStudentId(studentId, response.data.token);
      })
      .catch((e) => {
        // toast.error(e.response.data.message);
        toast.error("You are not authenticate");
      });
    },

    getStudentAluminiInfoByStudentId(studentId, token) {
      axios.get(`https://api.ewubd.edu/student/GetStudentAluminiInfoByStudentId/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        }
      })
      .then((response) => {
        if (response.data.status == 'success') {
          // let foundStudent = response.data.stdEduData.find(eduData => eduData.degreeName === 'Degree/Honours' && eduData.passingYear);
          // if (foundStudent) {
            // console.log('value found');
            this.manualRegisterButton = true; // for manual registration
            this.showVerifyCheckBoxArea = true;

            this.ewuStudentData = response.data;
            this.withoutHashEwuEmail = response.data.stdGeneralData.instituteEmailAddress;

            let mobileFirstChar = response.data.stdGeneralData.mobileNo.charAt(0);
            if(mobileFirstChar == '0') {
              this.hashMobile = this.hideMobile(response.data.stdGeneralData.mobileNo);
              this.withoutHashMobile = response.data.stdGeneralData.mobileNo;
            }else {
              this.hashMobile = this.hideMobile('0'+response.data.stdGeneralData.mobileNo);
              this.withoutHashMobile = '0'+response.data.stdGeneralData.mobileNo;
            }
            this.hashStudentPersonalEmail = this.hideEmail(response.data.stdGeneralData.personalEmailAddress);
            this.withoutHashStudentPersonalEmail = response.data.stdGeneralData.personalEmailAddress;
          // } else {
          //   console.log('value not found');
          //   toast.error("You are not an alumni. You are not register our site");
          // }
        } else if (response.data.status == 'failed') {
          this.showVerifyCheckBoxArea = false;
          this.showMobileInputArea = false;
          this.showEmailCheckBoxArea = false;
          toast.error("Invalid student id. Please provide valid student id");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },

    hideMobile(mobile) {
      const firstTwoDigits = mobile.slice(0, 2);
      const lastFourDigits = mobile.slice(-3);
      const hiddenDigits = mobile.slice(2, -3).replace(/\d/g, '*');
      const hiddenMobileNumber = `${firstTwoDigits}${hiddenDigits}${lastFourDigits}`;
      return hiddenMobileNumber;
    },

    hideEmail(email) {
      const firstTwoCharacter = email.slice(0, 2);
      const hidden = email.replace(/.(?=.{2,}@)/g, '*');
      const hiddenEmail = `${firstTwoCharacter}${hidden}`;
      return hiddenEmail;
    },

    checkMobileRadioButton(){
      this.showMobileInputArea = true
      this.showEmailCheckBoxArea = false

      this.showEwuEmailInputArea = false
      this.showStudentPersonalEmailInputArea = false
    },

    checkEmailRadioButton(){
      this.showEmailCheckBoxArea = true
      this.showMobileInputArea = false
    },

    checkEwuEmailRadioButton(){
      this.showEwuEmailInputArea = true
      this.showStudentPersonalEmailInputArea = false
    },

    checkStudentPersonalEmailRadioButton() {
      this.showEwuEmailInputArea = false
      this.showStudentPersonalEmailInputArea = true
    },

    matchHashMobileAndInputMobile(withoutHashMobile) {
      if (withoutHashMobile == this.mobile) {
        this.showSubmitButton = true;
      } else{
        this.showSubmitButton = false;
      }
    },

    sendOtpByMobile() {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/send-otp-by-mobile/${this.mobile}`)
      .then((response) => {
        if (response.data.status == "success") {
          this.$Progress.finish();
          toast.success(response.data.message);
          this.checkAlumniRegisterOrNotArea = false;
          this.otpCheckArea = true;
        } else if(response.data.status == "failed") {
          this.$Progress.fail();
          toast.error(response.data.message);
          this.checkAlumniRegisterOrNotArea = true;
          this.otpCheckArea = false;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },

    matchHashEwuEmailAndInputEmail(withoutHashEwuEmail) {
      if (withoutHashEwuEmail == this.ewuEmail) {
        this.showSubmitButton = true;
      } else{
        this.showSubmitButton = false;
      }
    },

    sendOtpByEwuEmail() {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/send-otp-by-email/${this.ewuEmail}`)
      .then((response) => {
        if (response.data.status == "success") {
          this.$Progress.finish();
          toast.success(response.data.message);
          this.checkAlumniRegisterOrNotArea = false;
          this.otpCheckArea = true;
        } else if(response.data.status == "failed") {
          this.$Progress.fail();
          toast.error(response.data.message);
          this.checkAlumniRegisterOrNotArea = true;
          this.otpCheckArea = false;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },

    matchHashStudentPersonalEmailAndInputEmail(withoutHashStudentPersonalEmail) {
      if (withoutHashStudentPersonalEmail == this.studentPersonalEmail) {
        this.showSubmitButton = true;
      } else{
        this.showSubmitButton = false;
      }
    },

    sendOtpByStudentPersonalEmail() {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/send-otp-by-email/${this.studentPersonalEmail}`)
      .then((response) => {
        if (response.data.status == "success") {
          this.$Progress.finish();
          toast.success(response.data.message);
          this.checkAlumniRegisterOrNotArea = false;
          this.otpCheckArea = true;
        } else if(response.data.status == "failed") {
          this.$Progress.fail();
          toast.error(response.data.message);
          this.checkAlumniRegisterOrNotArea = true;
          this.otpCheckArea = false;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },

    verifyOtp() {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/verify-otp/${this.otp}`)
      .then((response) => {
        if (response.data.status == "success") {
          this.$Progress.finish();
          toast.success(response.data.message);
          this.registerFormShowMode = true;
          this.checkAlumniRegisterOrNotArea = false;
          this.otpCheckArea = false;
        } else if(response.data.status == "failed") {
          this.$Progress.fail();
          toast.error(response.data.message);
          this.registerFormShowMode = false;
          this.checkAlumniRegisterOrNotArea = false;
          this.otpCheckArea = true;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },

    getStudentAluminiInfoByStudentIdForFillRegisterForm(ewuStudentId) {
      this.form.ewu_id_no = this.ewuStudentData.stdGeneralData.studentId;
      this.form.first_name = this.ewuStudentData.stdGeneralData.studentName;
      
      if (this.ewuStudentData.stdGeneralData.nationalId !== "") {
        this.form.nid = this.ewuStudentData.stdGeneralData.nationalId;
        document.getElementById("nid").setAttribute("readonly", "readonly");
      }else {
        document.getElementById("nid").removeAttribute("readonly");
      }

      if (this.ewuStudentData.stdGeneralData.dateofBirth !== "") {
        this.form.dob = moment(this.ewuStudentData.stdGeneralData.dateofBirth).format('DD/MM/YYYY');
        document.getElementById("dob").setAttribute("readonly", "readonly");
      }else {
        document.getElementById("dob").removeAttribute("readonly");
      }

      if (this.ewuStudentData.stdGeneralData.gender !== "") {
        this.form.gender = this.ewuStudentData.stdGeneralData.gender;
        document.getElementById("gender").setAttribute("readonly", "readonly");
      }else {
        document.getElementById("gender").removeAttribute("readonly");
      }

      if (this.ewuStudentData.stdGeneralData.bloodGroup !== "") {
        this.form.blood_group = this.ewuStudentData.stdGeneralData.bloodGroup;
        document.getElementById("blood-group").setAttribute("readonly", "readonly");
      }else {
        document.getElementById("blood-group").removeAttribute("readonly");
      }

      // if (this.ewuStudentData.stdGeneralData.personalEmailAddress !== "") {
      //   this.form.personal_email = this.ewuStudentData.stdGeneralData.personalEmailAddress;
      //   document.getElementById("personal_email").setAttribute("readonly", "readonly");
      // } else {
      //   document.getElementById("personal_email").removeAttribute("readonly");
      // }

      this.form.personal_email = this.ewuStudentData.stdGeneralData.personalEmailAddress;

      if (this.ewuStudentData.stdGeneralData.instituteEmailAddress !== "") {
        this.form.university_email = this.ewuStudentData.stdGeneralData.instituteEmailAddress;
        document.getElementById("university_email").setAttribute("readonly", "readonly");
      } else {
        document.getElementById("university_email").removeAttribute("readonly");
      }

      if (this.ewuStudentData.stdGeneralData.mobileNo !== "") {
        let mobileFirstChar = this.ewuStudentData.stdGeneralData.mobileNo.charAt(0);
        if (mobileFirstChar == '0') {
          this.form.personal_contact_number = this.ewuStudentData.stdGeneralData.mobileNo;
        } else {
          this.form.personal_contact_number = '0'+this.ewuStudentData.stdGeneralData.mobileNo;
        }
        document.getElementById("personal_contact_number").setAttribute("readonly", "readonly");
      }else {
        document.getElementById("personal_contact_number").removeAttribute("readonly");
      }

      if (this.ewuStudentData.stdGeneralData.programTypeName !== "") {
        this.form.program_type = this.ewuStudentData.stdGeneralData.programTypeName;
        document.getElementById("program-type").setAttribute("readonly", "readonly");
      } else {
        document.getElementById("program-type").removeAttribute("readonly");
      }

      if (this.ewuStudentData.stdGeneralData.programName !== "") {
        this.form.program_name = this.ewuStudentData.stdGeneralData.programName;
        document.getElementById("program-name").setAttribute("readonly", "readonly");
      } else {
        document.getElementById("program-name").removeAttribute("readonly");
      }

      let passingYear = '';
      $.each(this.ewuStudentData.stdEduData, function(index, item) {
        if (item.institution == 'East West University') {
          passingYear = item.passingYear;
        }
      });
      if (passingYear !== "") {
        this.form.passing_year = passingYear;
        document.getElementById("passing-year").setAttribute("readonly", "readonly");
      } else {
        document.getElementById("passing-year").removeAttribute("readonly");
      }

      if (this.ewuStudentData.stdGeneralData.academicDepartmentName !== "") {
        this.form.department_name = this.ewuStudentData.stdGeneralData.academicDepartmentName;
        document.getElementById("department-name").setAttribute("readonly", "readonly");
      } else {
        document.getElementById("department-name").removeAttribute("readonly");
      }

      if (this.ewuStudentData.stdGeneralData.passingSemester !== "") {
        this.form.passing_semester = this.ewuStudentData.stdGeneralData.passingSemester;
        document.getElementById("passing-semester").setAttribute("readonly", "readonly");
      } else {
        document.getElementById("passing-semester").removeAttribute("readonly");
      }

      if (this.ewuStudentData.stdGeneralData.convocationYear !== "") {
        this.form.convocation_year = this.ewuStudentData.stdGeneralData.convocationYear;
        document.getElementById("convocation-year").setAttribute("readonly", "readonly");
      } else {
        document.getElementById("convocation-year").removeAttribute("readonly");
      }
    },
    // Api registration optimize code end

    // Manual registration optimize code start
    manualRegisterFormShow() {
      let stdId = $('#student_id').val();
      this.form.ewu_id_no = stdId;
      this.checkAlumniRegisterOrNotArea = false;
      this.manualRegisterFormShowMode = true;
    }
    // Manual registration optimize code end






    // temporary code start
    // checkAlumniRegisterOrNotByStudentId() {
    //   let studentId = $('#student_id').val();
    //   this.ewuStudentId = studentId;
    //   axios.post(`${this.backendUrl}/check-alumni-by-student-id/${studentId}`)
    //   .then((response) => {
    //     if (response.data.status == true) {
    //       this.showVerifyCheckBoxArea = false;
    //       this.showMobileInputArea = false;
    //       this.showEmailCheckBoxArea = false;
    //       toast.success(response.data.message);
    //     } else if (response.data.status == false) {
    //       this.checkAuthenticateOrNot(studentId);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },

    // checkAuthenticateOrNot(studentId) {
    //   this.getStudentAluminiInfoByStudentId(studentId);
    // },

    // getStudentAluminiInfoByStudentId(studentId) {
    //   axios.get(`${this.backendUrl}/alumni/7`)
    //   .then((response) => {
    //     this.showVerifyCheckBoxArea = true;

    //     this.withoutHashEwuEmail = response.data.data.alumni.university_email;
    //     this.hashMobile = this.hideMobile(response.data.data.alumni.personal_contact_number);
    //     this.withoutHashMobile = response.data.data.alumni.personal_contact_number;
    //     this.hashStudentPersonalEmail = this.hideEmail(response.data.data.alumni.personal_email);
    //     this.withoutHashStudentPersonalEmail = response.data.data.alumni.personal_email;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },

    // hideMobile(mobile) {
    //   const firstTwoDigits = mobile.slice(0, 2);
    //   const lastFourDigits = mobile.slice(-3);
    //   const hiddenDigits = mobile.slice(2, -3).replace(/\d/g, '*');
    //   const hiddenMobileNumber = `${firstTwoDigits}${hiddenDigits}${lastFourDigits}`;
    //   return hiddenMobileNumber;
    // },

    // hideEmail(email) {
    //   const firstTwoCharacter = email.slice(0, 2);
    //   const hidden = email.replace(/.(?=.{2,}@)/g, '*');
    //   const hiddenEmail = `${firstTwoCharacter}${hidden}`;
    //   return hiddenEmail;
    // },

    // checkMobileRadioButton(){
    //   this.showMobileInputArea = true
    //   this.showEmailCheckBoxArea = false

    //   this.showEwuEmailInputArea = false
    //   this.showStudentPersonalEmailInputArea = false
    // },

    // checkEmailRadioButton(){
    //   this.showEmailCheckBoxArea = true
    //   this.showMobileInputArea = false
    // },

    // checkEwuEmailRadioButton(){
    //   this.showEwuEmailInputArea = true
    //   this.showStudentPersonalEmailInputArea = false
    // },

    // checkStudentPersonalEmailRadioButton() {
    //   this.showEwuEmailInputArea = false
    //   this.showStudentPersonalEmailInputArea = true
    // },

    // matchHashMobileAndInputMobile(withoutHashMobile) {
    //   if (withoutHashMobile == this.mobile) {
    //     this.showSubmitButton = true;
    //   } else{
    //     this.showSubmitButton = false;
    //   }
    // },

    // sendOtpByMobile() {
    //   this.$Progress.start();
    //   axios.post(`${this.backendUrl}/send-otp-by-mobile/${this.mobile}`)
    //   .then((response) => {
    //     if (response.data.status == "success") {
    //       this.$Progress.finish();
    //       toast.success(response.data.message);
    //       this.checkAlumniRegisterOrNotArea = false;
    //       this.otpCheckArea = true;
    //     } else if(response.data.status == "failed") {
    //       this.$Progress.fail();
    //       toast.error(response.data.message);
    //       this.checkAlumniRegisterOrNotArea = true;
    //       this.otpCheckArea = false;
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },

    // matchHashEwuEmailAndInputEmail(withoutHashEwuEmail) {
    //   if (withoutHashEwuEmail == this.ewuEmail) {
    //     this.showSubmitButton = true;
    //   } else{
    //     this.showSubmitButton = false;
    //   }
    // },

    // sendOtpByEwuEmail() {
    //   this.$Progress.start();
    //   axios.post(`${this.backendUrl}/send-otp-by-email/${this.ewuEmail}`)
    //   .then((response) => {
    //     if (response.data.status == "success") {
    //       this.$Progress.finish();
    //       toast.success(response.data.message);
    //       this.checkAlumniRegisterOrNotArea = false;
    //       this.otpCheckArea = true;
    //     } else if(response.data.status == "failed") {
    //       this.$Progress.fail();
    //       toast.error(response.data.message);
    //       this.checkAlumniRegisterOrNotArea = true;
    //       this.otpCheckArea = false;
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },

    // matchHashStudentPersonalEmailAndInputEmail(withoutHashStudentPersonalEmail) {
    //   if (withoutHashStudentPersonalEmail == this.studentPersonalEmail) {
    //     this.showSubmitButton = true;
    //   } else{
    //     this.showSubmitButton = false;
    //   }
    // },

    // sendOtpByStudentPersonalEmail() {
    //   this.$Progress.start();
    //   axios.post(`${this.backendUrl}/send-otp-by-email/${this.studentPersonalEmail}`)
    //   .then((response) => {
    //     if (response.data.status == "success") {
    //       this.$Progress.finish();
    //       toast.success(response.data.message);
    //       this.checkAlumniRegisterOrNotArea = false;
    //       this.otpCheckArea = true;
    //     } else if(response.data.status == "failed") {
    //       this.$Progress.fail();
    //       toast.error(response.data.message);
    //       this.checkAlumniRegisterOrNotArea = true;
    //       this.otpCheckArea = false;
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },

    // verifyOtp() {
    //   this.$Progress.start();
    //   axios.post(`${this.backendUrl}/verify-otp/${this.otp}`)
    //   .then((response) => {
    //     if (response.data.status == "success") {
    //       this.$Progress.finish();
    //       toast.success(response.data.message);
    //       this.registerFormShowMode = true;
    //       this.checkAlumniRegisterOrNotArea = false;
    //       this.otpCheckArea = false;
    //     } else if(response.data.status == "failed") {
    //       this.$Progress.fail();
    //       toast.error(response.data.message);
    //       this.registerFormShowMode = false;
    //       this.checkAlumniRegisterOrNotArea = false;
    //       this.otpCheckArea = true;
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },

    // getStudentAluminiInfoByStudentIdForFillRegisterForm(ewuStudentId) {
    //   axios.post(`${this.backendUrl}/get-student-alumni-info-by-student-id/153-35-1314`)
    //   .then((response) => {
    //     this.form.fill(response.data.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // }
    // temporay code end

  },
};
</script>

<style>
.register h4 {
    font-size: 24px;
    /* padding-bottom: 15px; */
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 30px;
    position: relative;
}

.register h4::before {
    position: absolute;
    content: '';
    height: 3px;
    width: 88px;
    background-color: #e32845;
    top: 43px;
}

.custom-width {
  width: 800px;
}

</style>

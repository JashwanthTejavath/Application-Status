// main.js
// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);
/**
 * @constant
 * @type {number}
 * @default
 */
let num_of_card = 0;
/**
 * @constant
 * @type {number}
 * @default
 */
const filter_all = 0;
/**
 * @constant
 * @type {number}
 * @default
 */
const filter_rejected = 1;
/**
 * @constant
 * @type {number}
 * @default
 */
const filter_unapplied = 2;
/**
 * @constant
 * @type {number}
 * @default
 */
const filter_applied = 3;
/**
 * @constant
 * @type {number}
 * @default
 */
const filter_screening = 4;
/**
 * @constant
 * @type {number}
 * @default
 */
const filter_interview = 5;
/**
 * @constant
 * @type {number}
 * @default
 */
const filter_offer = 6;

// Starts the program, all function calls trace back here

function init() {
  // Get the jobs from localStorage
  let jobs = get_jobs_from_storage();
  // Add each job to the <main> element
  num_of_card = jobs.length;
  document.getElementById("number-of-job-cards").innerText = num_of_card;
  add_jobs_to_document(jobs, 0);
  // Add the event listeners to the form elements
  const add_btn = document.getElementById("add_application_btn");
  const add_dialog = document.getElementById("add-application");

  document.getElementById("add_cancel").addEventListener("click", () => {
    add_dialog.close();
  });
  add_btn.addEventListener("click", () => {
    /* eslint-disable */
    add_dialog.showModal();
    /* eslint-enable */
  });

  init_form_handler();
  filter_button_listener();
}

/**
 * Reads 'jobs' from localStorage and returns an array of
 * all of the jobs found (parsed, not in string form). If
 * nothing is found in localStorage for 'jobs', an empty array
 * is returned.
 * @returns {Array<Object>} An array of jobs found in localStorage
 */
function get_jobs_from_storage() {
  //vars
  let unparsed_job_list = window.localStorage.getItem("jobs");
  let parsed_job_list = JSON.parse(unparsed_job_list);
  let empty_arr = [];

  //check for empty, then return empty
  if (parsed_job_list == null) {
    return empty_arr;
  }

  //else returns the parsed list
  return parsed_job_list;
}

/**
 * Takes in an array of jobs and for each job creates a
 * new <job-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new job
 * to <main>
 *
 * Can also append specific jobs to main depending on the job
 * status which can be specified by statusFilter parameter
 *
 * @param {Array<Object>} jobs An array of jobs
 * @param {number} status_filter status to filter jobs
 */
function add_jobs_to_document(jobs, status_filter) {
  // Get a reference to the <main> element
  let main = document.querySelector("main");

  // Loops through each of the jobs in the passed in array,
  // creates a <job-card> element for each one, and populate
  // sorted by date
  // Append each element to <main>
  let i = 0;
  let sort_dic = {};
  let sort_arr = [];
  while (i < jobs.length) {
    if (status_filter === 0 || jobs[i].status == status_filter - 1) {
      let job = document.createElement("job-card");
      job.data = jobs[i];
      let date = jobs[i]["date"];
      if (sort_dic[date] == null) {
        sort_dic[date] = [job];
      } else {
        sort_dic[date].push(job);
      }
      sort_arr.push(date);
    }
    i++;
  }
  sort_arr.sort();
  for (i = 0; i < sort_arr.length; i++) {
    for (let j = 0; j < sort_dic[sort_arr[i]].length; j++) {
      main.append(sort_dic[sort_arr[i]][j]);
    }
  }
}

// /**
//  * Takes in an array of jobs, converts it to a string, and then
//  * saves that string to 'jobs' in localStorage
//  * @param {Array<Object>} jobs An array of jobs
//  */
// function save_jobs_to_storage (jobs) {
//   localStorage.setItem("jobs", JSON.stringify(jobs));
// }

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function init_form_handler() {
  const add_dialog = document.getElementById("add-application");
  document.getElementById("add_cancel").addEventListener("click", () => {
    document.querySelector("#company").value = "";
    document.querySelector("#position").value = "";
    document.querySelector("#location").value = "";
    document.querySelector("#date").value = "";
    add_dialog.close();
  });

  let form_element = document.querySelector("#add-form");
  let item_list = get_jobs_from_storage();

  // Add an event listener for the 'submit' event, which fires when the
  // submit button is clicked
  form_element.addEventListener("submit", () => {
    //new FormData object from the <form> element reference above
    let form_data = new FormData(form_element);
    let job_object = new Object();
    job_object["id"] = num_of_card;
    job_object["status"] = 1;
    num_of_card += 1;
    for (let [key, value] of form_data) {
      job_object[key] = value;
    }

    // new <job-card> element
    let job_card = document.createElement("job-card");
    // Add the jobObject data to <recipe-card> using element.data
    job_card.data = job_object;
    // Append this new <job-card> to <main>
    //main.append
    document.querySelector("main").append(job_card);
    // Get the jobs array from localStorage, add this new job to it, and
    // then try to save the jobs array back to localStorage
    // if localStorage has enough space for saving, it will be saved
    // otherwise, not save, but displayed with warning messages
    item_list.push(job_object);
    try {
      localStorage.setItem("jobs", JSON.stringify(item_list));
    } catch (e) {
      alert(
        "local storage has exceed storage limit, this change will not be saved, remove some unnecessary items"
      );
    }
  });
}

/**
 * @description Updates the filter buttons by retrieving which filter was clicked
 * and updates the job cards to show the cards that were filtered
 */
function filter_button_listener() {
  // prettier-ignore
  document.getElementsByClassName("filterStages")[0].addEventListener("click", function (e) {
    // get which bubble was clicked for that specific progress bar
    if (e.target && e.target.nodeName === "LI") {
      const filter = e.target.textContent;
      let filter_num = 0;
      switch (filter) {
        case "All":
          filter_num = filter_all;
          break;
        case "Rejected":
          filter_num = filter_rejected;
          break;
        case "Unapplied":
          filter_num = filter_unapplied;
          break;
        case "Applied":
          filter_num = filter_applied;
          break;
        case "Screening":
          filter_num = filter_screening;
          break;
        case "Interview":
          filter_num = filter_interview;
          break;
        case "Offer":
          filter_num = filter_offer;
          break;
      }
      // make the clicked bubble purple and all others white
      update_filter(document.getElementsByClassName("filterStages")[0], filter_num);

      let main = document.querySelector("main");

      // Removes All Jobs
      let array_of_jobs = main.querySelectorAll("job-card");
      for (let i = 0; i < array_of_jobs.length; i++) {
        array_of_jobs[i].remove();
      }
      let jobs = get_jobs_from_storage();

      add_jobs_to_document(jobs, filter_num);

    }
  });
}

/**
 * @param {Object} ul The filter bar
 * @param {number} filter_num The current filter (bubble) we have clicked
 * @description Makes a specific filter bubble purple and makes all others white.
 */
function update_filter(ul, filter_num) {
  // get the filters
  const li = ul.getElementsByTagName("li");

  // change each bubble accordingly
  for (let i = 0; i < li.length; i++) {
    if (i === filter_num) {
      li[i].classList.add("active");
    } else {
      li[i].classList.remove("active");
    }
  }
}

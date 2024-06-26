class JobCard extends HTMLElement {
  constructor() {
    super(); 
    let shadow_element = this.attachShadow({ mode: "open" });
    // Creates an <article> element
    let article_element = document.createElement("article");
    // Create a style element
    let style_element = document.createElement("style");

    //Job card CSS goes here
    style_element.textContent = `

    
    :root {
      --special-color: #95a1f1;
      --job-card-backgroud-color: #e6e6e6;
    }
    
    body.dark-theme {
      --job-card-backgroud-color: rgba(30,30,30,255);
    }
    
    * {
    font-family: Ubuntu;
    }
    
    .grid-container {
      display: grid;
      grid-template-columns: 0.15fr .7fr 1fr 0.2fr;
      background: var(--job-card-backgroud-color);
      padding: 20px 30px;
      border: 3px solid black;
      margin: 1em 0;
    }
    
    .grid-1 {
      align-self: center;
      place-self: center;
    }
    
    .grid-1 img {
      font-size: 50px;
      margin-top: 20%;
      padding-right: 10px;
    }
    
    .grid-2 {
      position: relative;
      left: 10px;
      padding: unset;
      
    }
    
    .delete-icon,
    .edit-icon {
      border: none;
      cursor: pointer;
      background-color: var(--job-card-backgroud-color);
      width: 1.5rem;
      padding-left : 20px
    }
    
    .grid-4 {
      text-align: center;
      padding-left: 20px;
    }
    .grid-4 i {
      font-size: 1.7em;
      padding-bottom: .3em;
    }
    
    .position {
      font-weight: bold;
      font-size: 25px;
    }
    
    .company,
    .location {
      font-size: 16px;
    }
    
    .position,
    .company,
    .location {
      margin: 0;
      width: 94%;
    }
    
    .job-card {
      background: grey;
      border: 2px solid black;
      padding: 3px 10px;
    }
    
    #progress-1,
    #progress-2 {
      position: relative;
    }
    
    #progress-bar-1,
    #progress-bar-2{
      position: absolute;
      background: black;
      margin: unset;
      width: 100%;
      height: 5px;
      top: 50%
    }
    
    
    .stages {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-between;
      height: 100%;
      align-items: center;
      position: relative;
    }
    
    .stages::before {
      position: absolute;
      width: 97%;
    }
    
    .stages .step {
      border: 3px solid black;
      cursor: pointer;
      border-radius: 100%;
      width: 25px;
      height: 25px;
      background-color: #fff;
      position: relative;
    }
    
    .stages .step span {
      display: none;
    }
    
    .stages .step p {
      text-align: center;
      line-height: 300%;
      cursor: default;
      font-size: 16px;
      height: 0;
      position: absolute;
    }
    
    .stages .step.active {
      background-color: var(--special-color);
    }

    #img-icon {
      width: 80px
    }
    
    /* MEDIA QUERIES */
    @media screen and (max-width: 1127px) {
      .grid-container {
        grid-template-columns: 0.15fr .5fr 1.2fr 0.3fr;
      }
      .position {
        font-weight: bold;
        font-size: 23px;
      }
      .company,
      .location {
        font-size: 14px;
      }
      .stages .step p {
        font-size: 14px;
      }
      .grid-1 i {
        padding-bottom: 20px;
        font-size: 45px;
      }
    } 
    
    @media screen and (max-width: 920px) {
      .grid-container {
        grid-template-columns: 0.15fr .45fr 1.47fr 0.08fr;
      }
      .position {
        font-weight: bold;
        font-size: 23px;
      }
      .company,
      .location {
        font-size: 14px;
      }
      .stages .step p {
        font-size: 14px;
      }
      .grid-1 i {
        padding-bottom: 40px;
        font-size: 40px;
      }
      .grid-4 i {
      font-size: 1.7em;
      }
    }
    
    @media screen and (max-width: 790px) {
      .grid-container {
        grid-template-columns: 0.13fr .43fr 1.53fr 0.06fr;
      }
      .position {
        font-weight: bold;
        font-size: 19px;
      }
      .company,
      .location {
        font-size: 10px;
      }
      .stages .step p {
        top: 10px;
        font-size: 10px;
      }
      .grid-1 i {
        padding-bottom: 40px;
      }
      .grid-2 {
        padding-right: 10px;
      }
    } 
    
    @media screen and (max-width: 640px) {
      .grid-container {
        grid-template-columns: [grid1] 0.13fr [grid2] .43fr [grid3] 1.53fr [grid4] 0.01fr;
        padding: 20px 12px;
      }
      .position {
        font-weight: bold;
        font-size: 19px;
      }
      .company,
      .location {
        font-size: 10px;
      }
      .stages .step p {
        top: 10px;
        font-size: 10px;
      }
      .grid-1{
        display: none;
      }
      .grid-1 i {
        padding-bottom: 40px;
      }
      .grid-2 {
        padding-right: 10px;
        grid-column-start: 1;
        grid-column-end: span grid3;
      }
      .grid-4 {
        padding-left: 3px;
      }
    } 
    `;
    
    // Appends the <style> and <article> elements to the Shadow DOM.
    shadow_element.append(style_element);
    shadow_element.append(article_element);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * @param {Object} data - The data to pass into the <job-card>, must be of the
   *                        following format: 
   *                        {
   *                          "id": automatically assigned by number of job card
   *                          "company": "Google",(str)
   *                          "location": "Mountain View, CA",(str)
   *                          "status": 5,(unapplied, applied, rejected, screened, interviewed, offer)
   *                          "position": "Data Science Intern", (str)
   *                          "date": "12/24/2022" (str)
   */
  set data(data) {
    if (!data) return;
    let shadow_article = this.shadowRoot.querySelector("article");
    const id = data.id;
    const company = data.company;
    const location = data.location;
    const status = data.status;
    const position = data.position;
    const date = data.date;
    var img = "image-solid.png";
    shadow_article.innerHTML = `
    <!-- BEGIN JOB CARD -->
    <div class="grid-container">
      <!--     Logo (for the future)  -->
      <div class="grid-1">
        <input id="img-icon" type="image" src="${img}" alt="logo">
      </div>

      <!--     Application Text -->
      <div class="grid-2">
        <p class="position">${position}</p>
        <p class="company">${company}</p>
        <p class="location">${location}</p>
        <p class="date">${date}</p>

      </div>

      <!--     Progress Bar -->
      <div id="progress-1" class="grid-3">
        <div id="progress-bar-1"></div>
        <ul class="stages">
          <li class="step">
            <span>1</span>
            <p>Rejected</p>
          </li>
          <li class="step">
            <span>2</span>
            <p>Unapplied</p>
          </li>
          <li class="step">
            <span>3</span>
            <p>Applied</p>
          </li>
          <li class="step">
            <span>4</span>
            <p>Screening</p>
          </li>
          <li class="step">
            <span>5</span>
            <p>Interview</p>
          </li>
          <li class="step">
            <span>6</span>
            <p>Offer</p>
          </li>
        </ul>
      </div>

      <!--       Trash/Pencil Icons -->
      <div class="grid-4">
      <input class="delete-icon" type="image" src="trash-solid.svg" />
      <input class="edit-icon" type="image" src="pen-solid.svg" />
      </div>
    </div>

    <!-- END JOB CARD -->
    `;

    // update stage
    let stage = this.shadowRoot.querySelector(".stages").querySelectorAll("li");
    stage[status].classList.add("active");
    for (let i = 0; i < stage.length; i++) {
      stage[i].addEventListener("click", () => {
        // get which bubble was clicked for that specific progress bar
        // make the clicked bubble purple and prev status white
        let items = localStorage.getItem("jobs");
        let item_list = JSON.parse(items);
        let prev = item_list[id]["status"];
        stage[prev].classList.remove("active");
        stage[i].classList.add("active");
        item_list[id]["status"] = String(i);
        localStorage.setItem("jobs", JSON.stringify(item_list));
      });
    }

    this.shadowRoot
      .querySelector(".delete-icon")
      .addEventListener("click", () => {
        const delete_dialog = document.getElementById("delete-application");
        delete_dialog.showModal();
        document.getElementById("d_cancel").addEventListener("click", () => {
          delete_dialog.close();
        });
        document.getElementById("d_delete").addEventListener("click", () => {
          let items = window.localStorage.getItem("jobs");
          let item_list = JSON.parse(items);
          item_list.splice(id, 1);
          for (let i = 0; i < item_list.length; i++) {
            item_list[i]["id"] = String(i);
          }
          localStorage.setItem("jobs", JSON.stringify(item_list));
          document.getElementById("delete-application").close();
          window.location.reload();
        });
      });

    // Button Event for Update(will go to update modal, and confirmation button in update modal will be below)
    // For status change, might be extracted to out of this button event to get user change
    // Jobcard 'id' is not changed for this button action
    this.shadowRoot
      .querySelector(".edit-icon")
      .addEventListener("click", () => {
        const edit_dialog = document.getElementById("edit-application");
        const edit_cancel = document.getElementById("edit_cancel");
        const edit_form = document.getElementById("edit-form");

        edit_dialog.showModal();
        document.getElementById("company-edit").value = company;
        document.getElementById("position-edit").value = position;
        document.getElementById("location-edit").value = location;
        document.getElementById("date-edit").value = date;
        edit_cancel.addEventListener("click", () => {
          edit_dialog.close();
        });
        document.getElementById("edit-form").addEventListener("submit", () => {
          let items = window.localStorage.getItem("jobs");
          let item_list = JSON.parse(items);
          item_list[id]["company"] = edit_form.company.value;
          item_list[id]["position"] = edit_form.position.value;
          item_list[id]["location"] = edit_form.location.value;
          item_list[id]["date"] = edit_form.date.value;
          localStorage.setItem("jobs", JSON.stringify(item_list));
        });
      });
  }
}
customElements.define("job-card", JobCard);

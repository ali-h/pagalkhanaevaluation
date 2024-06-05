// global variables
let CLIENTS = [];
let searchedClients = [];

// url params
const urlParams = new URLSearchParams(window.location.search);
const CLIENT = urlParams.get('client');
const EVALUATION = urlParams.get('evaluation');

// on page ready
$(document).ready(async function() {
  // on long press of logo
  $('#unregister').dblclick(function() {
    // unregister service worker
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
      }
    });

    // show success toast
    toast('Service worker unregistered', 'success');
  });

  // load clients from API
  try {
    const data = await getClients();
    CLIENTS = data;
  }
  catch (error) {
    console.error(error);
  }

  // load clients from local storage
  if (localStorage.getItem('clients')) {
    CLIENTS.push(...JSON.parse(localStorage.getItem('clients')));
  }

  // eliminate duplicates
  CLIENTS = eliminateDuplicates(CLIENTS);

  // set clients to local storage
  localStorage.setItem('clients', JSON.stringify(CLIENTS));

  // if client and evaluation exists
  if (CLIENT && EVALUATION) {
    // if client and evaluation exists, evaluate client
    if (CLIENT < CLIENTS.length && EVALUATION in EVALUATIONS) {
      evaluate(EVALUATION, CLIENT);
      $('#loading').addClass('d-none');
    } else {
      toast('Client or evaluation not found', 'danger');
    }
  } else if (CLIENT) {
    // if client exists, view client
    if (CLIENT < CLIENTS.length) {
      view(CLIENT);
      $('#loading').addClass('d-none');
    } else {
      toast('Client not found', 'danger');
    }
  } else {
    // if no client or evaluation, render clients
    renderClients();
    $('#loading').addClass('d-none');
    $('#clients_page').removeClass('d-none');
  }

  $('#syncClients').click(async function() {
    try {
      await syncClients();
      toast('Clients synced successfully', 'success');
    }
    catch (error) {
      $('#syncClients').addClass('btn-warning');
      $('#syncClients').removeClass('btn-success')
      toast('Failed to sync clients', 'danger');
      console.error(error);
    }
  });

  $('#addClientForm').submit(async function(e) {
    e.preventDefault();
  
    // get form data
    const name = $('#newClientName').val();
    const date = $('#newClientDate').val();
  
    // validate form data
    if (!name || !date) {
      toast('Please fill all fields', 'danger');
      return;
    }
  
    // create new client object
    const client = {
      index: CLIENTS.length,
      name,
      date,
      evaluations: {
        BPRS: {},
        PANSS: {}
      }
    };
  
    // add client to clients array
    client.lastUpdate = new Date();
    CLIENTS.push(client);
  
    // save clients to local storage
    localStorage.setItem('clients', JSON.stringify(CLIENTS));
    
    // render clients
    renderClients();

    // show success toast
    toast('Client added successfully', 'success');

    // close modal
    $('#addClientModal').modal('hide');

    try {
      await syncClients();
    } catch (error) {
      $('#syncClients').addClass('btn-warning');
      $('#syncClients').removeClass('btn-success')
      console.error(error);
    }  
  });

  $('#clients_table').on('click', '.evalute_btn', function() {
    const index = $(this).closest('tr').attr('id').split('_')[1];
    const evaluation = $(this).text();
    evaluate(evaluation, index);

    // push url to history
    history.pushState(null, null, `?client=${index}&evaluation=${evaluation}`);
  });

  $('#clients_table').on('click', '.viewClient', function() {    
    const index = $(this).data('client-id');
    view(index);

    // push url to history
    history.pushState(null, null, `?client=${index}`);
  });

  $('#clients_table').on('click', '.deleteClient', async function() {
    const index = $(this).data('client-id');

    CLIENTS.splice(index, 1);
    localStorage.setItem('clients', JSON.stringify(CLIENTS));

    renderClients();
    toast('Client deleted successfully', 'success');

    try {
      await syncClients();
    } catch (error) {
      $('#syncClients').addClass('btn-warning');
      $('#syncClients').removeClass('btn-success')
      console.error(error);
    }
  });

  $('#client_view_page').on('click', '.back', function() {
    defaultView();
  });

  $('#client_evaluation_page').on('click', '.back', function() {
    defaultView();
  });

  $('#searchClients').on('keyup', function() {
    const search = $(this).val().toLowerCase();
    console.log(search);
    searchedClients = CLIENTS.filter(client => client.name.toLowerCase().includes(search));
    renderClients();
  });

  $('#printEvaluation').click(function() {
    window.print();
  });
});

// UTILITY FUNCTIONS
function defaultView() {
  $('#client_view_page').addClass('d-none');
  $('#client_evaluation_page').addClass('d-none');
  $('#clients_page').removeClass('d-none');

  // push url to history
  history.pushState(null, null, '/');

  // render clients
  renderClients();
}

// toast function
function toast(message, type) {
  // createa a bootstrap toast with success or danger
  
  // generate random toast id
  const toast_id = Math.floor(Math.random() * 1000000);

  const toast = `
    <div class="toast align-items-center text-bg-${type} border-0" data-bs-delay="1000" id="t${toast_id}">
      <div class="d-flex">
        <div class="toast-body">
          <span class="fs-5">${message}</span>
        </div>
      </div>
    </div>
  `;

  // add toast to toast div
  $("#toast_wrapper").append(toast);

  // show toast
  $(`#t${toast_id}`).toast('show');
}

// download file function
function downloadFile(filename, text) {
  // create a new element
  const element = document.createElement('a');

  // set href to file
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);

  // set download attribute to filename
  element.setAttribute('download', filename);

  // hide element
  element.style.display = 'none';

  // add element to body
  document.body.appendChild(element);

  // click element
  element.click();

  // remove element from body
  document.body.removeChild(element);
}

renderClients = async () => {
  let localClients = CLIENTS;
  if (searchedClients.length > 0) {
    localClients = searchedClients;
  }

  if (!localClients.length > 0) {
    $('#clients_table').empty();
    $('#clients_table').append('<tr><td colspan="5" class="text-center">No clients found</td></tr>');
    return;
  };

  // render clients to table
  $('#clients_table').empty();
  localClients.forEach((client, index) => {
    const tr = `
      <tr id="client_${index}">
        <td class="text-nowrap">${index + 1}</td>
        <td>${client.name}</td>
        <td class="text-nowrap">${client.date}</td>
        <td>
          <div class="d-flex flex-wrap gap-2">
            <button class="evalute_btn btn btn-sm ${isEvaluated('BPRS', client) ? 'btn-outline-primary' : 'btn-primary'}">BPRS</button>
            <button class="evalute_btn btn btn-sm ${isEvaluated('PANSS', client) ? 'btn-outline-primary' : 'btn-primary'}">PANSS</button>
          </div>
        </td>
        <td style="text-align: right" class="text-nowrap">
          <button class="btn btn-sm btn-success viewClient" data-client-id="${index}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-vr" viewBox="0 0 16 16">
              <path d="M3 12V4a1 1 0 0 1 1-1h2.5V2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5v-1H4a1 1 0 0 1-1-1m6.5 1v1H12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9.5v1H12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1zM8 16a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 1 0v15a.5.5 0 0 1-.5.5"/>
            </svg>
          </button>
          <button class="btn btn-sm btn-danger deleteClient" data-client-id="${index}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </button>
        </td>
      </tr>
    `;
    $('#clients_table').append(tr);
  });
}

const isEvaluated = (evaluation, client) => {
  try {
    return client.evaluations.hasOwnProperty(evaluation) && Object.keys(client.evaluations[evaluation]).length > 0;
  } catch (error) {
    return false;
  }
}

function evaluate (evaluation, index) {
  // get client
  const client = CLIENTS[index];

  // create a form for evaluation
  const form = $(`<form id="evaluationForm" class="d-flex flex-column flex-wrap justify-content-center g-3"></form>`);

  // add questions to form
  const questions = EVALUATIONS[evaluation].questions;
  const scores = EVALUATIONS[evaluation].scores;
  for (const question in questions) {
    // replace spaces and special characters with _
    const questionId = question.replace(/[^a-zA-Z0-9]/g, '_');
    const div = $(`
      <div class="form-question mb-2">
        <button type="button" data-bs-toggle="collapse" data-bs-target="#${questionId}_collapse" class="btn btn-outline-primary fs-4 mb-3"><strong>${question}</strong></button>
        <div class="collapse mb-3" id="${questionId}_collapse">
          <div class="card card-body">
            <p class="m-0">${questions[question]}</p>
          </div>
        </div>
        <div class="d-flex flex-wrap fs-6 answers"></div>
      </div>
    `);

    // radio buttons
    for (const score in scores) {
      // if question is already answered, check the radio button
      let isChecked = '';
      if (client.evaluations && client.evaluations[evaluation] && client.evaluations[evaluation][questionId] == score) {
        isChecked = 'checked';
      }

      const radio = `
        <div class="form-check form-check-inline mb-3">
          <input class="form-check-input answer" type="radio" name="${question}" id="${question}_${score}" value="${score}" data-client-id="${index}" data-evaluation="${evaluation}" ${isChecked}>
          <label class="form-check-label btn btn-outline-secondary" for="${question}_${score}">${score} ${scores[score]}</label>
        </div>
      `;
      div.find('.answers').append(radio);
    }

    form.append(div);
  }

  // show evaluation page
  $('#clients_page').addClass('d-none');
  $('#client_evaluation_page').removeClass('d-none');

  $('#evaluation_form').empty();
  $('#clientName').text(client.name);
  $('#evaluationType').text(evaluation);

  // add form to evaluation page
  $('#evaluation_form').append(form);

  // on aswer change
  $('.answer').change(async function() {
    // get question and answer
    const question = $(this).attr('name');
    const answer = $(this).val();

    const index = $(this).data('client-id');
    const evaluation = $(this).data('evaluation');

    // if client did not have evaluation, create empty evaluation
    if (!CLIENTS[index].evaluations || !CLIENTS[index].evaluations[evaluation]) {
      
      if (!CLIENTS[index].evaluations) {
        CLIENTS[index].evaluations = {};
      }
      
      CLIENTS[index].evaluations[evaluation] = {};
    }

    const questionId = question.replace(/[^a-zA-Z0-9]/g, '_');

    // add answer to client
    CLIENTS[index].evaluations[evaluation][questionId] = answer;

    // set last Update
    CLIENTS[index].lastUpdate = new Date();

    // save clients to local storage
    localStorage.setItem('clients', JSON.stringify(CLIENTS));

    // show success toast
    toast('Assessment saved', 'success');

    try {
      await syncClients();
    } catch (error) {
      $('#syncClients').addClass('btn-warning');
      $('#syncClients').removeClass('btn-success');
      console.error(error);
    }
  });
}

function calculateTotalScore (evaluation, evaluationType) {
  let total = 0;

  if (evaluationType === 'PANSS') {
    // calulate P, N, G scores separately
    let P = 0;
    let N = 0;
    let G = 0;

    for (const question in evaluation) {
      const score = parseInt(evaluation[question]);
      if (question.startsWith('P')) {
        P += score;
      } else if (question.startsWith('N')) {
        N += score;
      } else if (question.startsWith('G')) {
        G += score;
      }
    }

    return `P: ${P}, N: ${N}, G: ${G}`;
  }

  for (const question in evaluation) {
    total += parseInt(evaluation[question]);
  }

  return total;
}

function view (index) {
  const client = CLIENTS[index];
  const evaluations = client.evaluations;
  const clientName = client.name;
  const clientDate = client.date;

  $('#clientNameView').text(clientName);
  $('#clientDateView').text(clientDate);
  $('#clientEvaluations').empty();

  for (const evaluation in evaluations) {
    const questions = EVALUATIONS[evaluation].questions;
    const scores = EVALUATIONS[evaluation].scores;

    const div = $(`
      <div class="evaluation">
        <h4 class="text-center">${evaluation}</h4>
        <h4 class="text-center">
          <badge class="badge bg-primary">
            Total Score: ${calculateTotalScore(evaluations[evaluation], evaluation)}
          </badge>
        </h4>
        <hr>
        <div class="questions"></div>
      </div>
    `);

    for (const question in questions) {
      const questionId = question.replace(/[^a-zA-Z0-9]/g, '_');

      if (!evaluations[evaluation][questionId]) {
        continue;
      }

      const questionDiv = $(`
        <div class="question">
          <h5><strong>${question}:</strong>
          <badge class="badge bg-primary">
            ${evaluations[evaluation][questionId]} ${scores[evaluations[evaluation][questionId]]}
          </badge>
          </h5>
        </div>
      `);
      div.find('.questions').append(questionDiv);
    }

    $('#clientEvaluations').append(div);
  }

  $('#clients_page').addClass('d-none');
  $('#client_view_page').removeClass('d-none');
}

const projectURL = 'https://pagalkhanaevaluation-default-rtdb.firebaseio.com/clients.json';

async function getClients () {
  try {
    const response = await fetch(projectURL);

    if (!response.ok) {
      throw new Error('Failed to get clients');
    }

    const data = await response.json();
    return Object.values(data);
  } catch (e) {
    $('#syncClients').addClass('btn-warning');
    $('#syncClients').removeClass('btn-success')
    $('#syncClients').removeClass('btn-primary')

    return [];
  }
}

async function syncClients () {
  try {
    const response = await fetch(projectURL, {
      method: 'PUT',
      headers: {
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      },
      body: JSON.stringify(CLIENTS)
    });

    if (!response.ok) {
      throw new Error('Failed to sync clients');
    }

    $('#syncClients').addClass('btn-success');
    $('#syncClients').removeClass('btn-warning');

    return await response.json();
  } catch (e) {
    throw e;
  }
}

function eliminateDuplicates(arr) {
  // if duplicate clients found, keep the latest one (lastUpdate)
  // create a map to store clients
  const map = new Map();

  // iterate through clients
  for (const item of arr) {
    // if client is not in map, add it
    if (!map.has(item.index)) {
      map.set(item.index, item);
    } else {
      // if client is in map, compare lastUpdate
      const existing = map.get(item.index);
      if (new Date(item.lastUpdate) > new Date(existing.lastUpdate)) {
        map.set(item.index, item);
      }
    }
  }

  // return array of clients
  return Array.from(map.values());
}


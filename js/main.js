// global variables
let CLIENTS = [];
$('#syncClients').removeClass('btn-success')

const EVALUATIONS = {
  BPRS: {
    questions: {
      'SOMATIC CONCERN': 'Degree of concern over present bodily health. Rate the degree to which physical health is perceived as a problem by the patient, whether complaints have a realistic basis or not.',
      'ANXIETY': 'Worry, fear, or over-concern for present or future. Rate solely on the basis of verbal report of patient’s own subjective experiences. Do not infer anxiety from physical signs or from neurotic defense mechanisms.',
      'EMOTIONAL WITHDRAWAL': 'Deficiency in relating to the interviewer and to the interviewer situation. Rate only the degree to which the patient gives the impression of failing to be in emotional contact with other people in the interview situation.',
      'CONCEPTUAL DISORGANIZATION': 'Degree to which the thought processes are confused, disconnected, or disorganized. Rate on the basis of integration of the verbal products of the patient; do not rate on the basis of patient’s subjective impression of his own level of functioning.',
      'GUILT FEELINGS': 'Over-concern or remorse for past behavior. Rate on the basis of the patient’s subjective experiences of guilt as evidenced by verbal report with appropriate affect; do not infer guilt feelings from depression, anxiety or neurotic defenses.',
      'TENSION': 'Physical and motor manifestations of tension “nervousness”, and heightened activation level. Tension should be rated solely on the basis of physical signs and motor behavior and not on the basis of subjective experiences of tension reported by the patient.',
      'MANNERISMS AND POSTURING': 'Unusual and unnatural motor benavior, the type of motor behavior which causes certain mental patients to stand out in a crowd of normal people. Rate only abnormality of movements; do not rate simple heightened motor activity here.',
      'GRANDIOSITY': 'Exaggerated self-opinion, conviction of unusual ability or powers. Rate only on the basis of patient’s statements about himself or self-in-relation-to-others, not on the basis of his demeanor in the interview situation.',
      'DEPRESSIVE MOOD': 'Despondency in mood, sadness. Rate only degree of despondency; do not rate on the basis of inferences concerning depression based upon general retardation and somatic complaints.',
      'HOSTILITY': 'Animosity, contempt, belligerence, disdain for other people outside the interview situation. Rate solely on the basis of the verbal report of feelings and actions of the patient toward others; do not infer hostility from neurotic defenses, anxiety, nor somatic complaints. (Rate attitude toward interviewer under “uncooperativeness”).',
      'SUSPICIOUSNESS': 'Brief (delusional or otherwise) that others have now, or have had in the past, malicious or discriminatory intent toward the patient. On the basis of verbal report, rate only those suspicions which are currently held whether they concern past or present circumstances.',
      'HALLUCINATORY BEHAVIOR': 'Perceptions without normal external stimulus correspondence. Rate only those experiences which are reported to have occurred within the last week and which are described as distinctly different from the thought and imagery processes of normal people.',
      'MOTOR RETARDATION': 'Reduction in energy level evidenced in slowed movements. Rate on the basis of observed behavior of the patient only; do not rate on the basis of patient’s subjective impression of own energy level.',
      'UNCOOPERATIVENESS': 'Evidence of resistance, unfriendliness, resentment, and lack of readiness to cooperate with the interviewer. Rate only on the basis of the patient’s attitude and responses to the interviewer and the interview situation; do not rate on basis of reported resentment or uncooperativeness outside the interview situation.',
      'UNUSUAL THOUGHT CONTENT': 'Unusual, odd, strange or bizarre thought content. Rate here the degree of unusualness, not the degree of disorganization of thought processes.',
      'BLUNTED AFFECT': 'Reduced emotional tone, apparent lack of normal feeling or involvement.',
      'EXCITEMENT': 'Heightened emotional tone, agitation, increased reactivity.',
      'DISORIENTATION': 'Confusion or lack of proper association for person, place or time.',
    },
    scores: {
      0: 'Not Assessed',
      1: 'Not Present',
      2: 'Very Mild',
      3: 'Mild',
      4: 'Moderate',
      5: 'Moderately Severe',
      6: 'Severe',
      7: 'Extremely Severe',
    },
  },
  PANSS: {
    questions: {
      'P1 Delusions': 'Beliefs which are unfounded, unrealistic and idiosyncratic.',
      'P2 Conceptual disorganisation': 'Disorganised process of thinking characterised by disruption of goal-directed sequencing, e.g. circumstantiality, loose associations, tangentiality, gross illogicality or thought block.',
      'P3 Hallucinatory behaviour': 'Verbal report or behaviour indicating perceptions which are not generated by external stimuli. These may occur in the auditory, visual, olfactory or somatic realms.',
      'P4 Excitement': 'Hyperactivity as reflected in accelerated motor behaviour, heightened responsivity to stimuli, hypervigilance or excessive mood lability.',
      'P5 Grandiosity': 'Exaggerated self-opinion and unrealistic convictions of superiority, including delusions of extraordinary abilities, wealth, knowledge, fame, power and moral righteousness.',
      'P6 Suspiciousness/persecution': 'Unrealistic or exaggerated ideas of persecution, as reflected in guardedness, ad distrustful attitude, suspicious hypervigilance or frank delusions that others mean harm.',
      'P7 Hostility': 'Verbal and nonverbal expressions of anger and resentment, including sarcasm, passive-aggressive behaviour, verbal abuse and assualtiveness.',
      
      'N1 Blunted affect': 'Diminished emotional responsiveness as characterised by a reduction in facial expression, modulation of feelings and communicative gestures.',
      'N2 Emotional withdrawal': 'Lack of interest in, involvement with and affective commitment to life’s events.',
      'N3 Poor rapport': 'Lack of interpersonal empathy, openness in conversation and sense of closeness, interest or involvement with the interviewer.',
      'N4 Passive/apathetic social withdrawal': 'Diminished interest and initiative in social interactions due to passivity, apathy, anergy or avolition.',
      'N5 Difficulty in abstract thinking': 'Impairment in the use of the abstract-symbolic mode of thinking, as evidenced by difficulty in classification, forming generalisations and proceeding beyond concrete or egocentric thinking in problem-solving tasks.',
      'N6 Lack of spontaneity & flow of conversation': 'Reduction in the normal flow of communication associated with apathy, avolition, defensiveness or cognitive deficit. This is manifested by diminished fluidity and productivity of the verbal interactional process.',
      'N7 Stereotyped thinking': 'Decreased fluidity, spontaneity and flexibility of thinking, as evidenced in rigid, repetitious or barren thought content.',
      
      'G1 Somatic concern': 'Preoccupation with health and bodily functioning, as evidenced by hypochondriacal preoccupations, somatic delusions, or excessive verbalisation of somatic complaints.',
      'G2 Anxiety': 'Subjective experience of nervousness, worry, apprehension or restlessness, ranging from excessive concern about the present or future to feelings of panic.',
      'G3 Guilt feelings': 'Sense of remorse or self-blame for real or imagined misdeeds in the past.',
      'G4 Tension': 'Overt physical manifestations of fear, anxiety, and agitation, such as stiffness, tremor, profuse sweating and restlessness.',
      'G5 Mannerisms & posturing': 'Unnatural movements or posture as characterised be an awkward, stilted, disorganised, or bizarre appearance.',
      'G6 Depression': 'Feelings of sadness, discouragement, helplessness and pessimism.',
      'G7 Motor retardation': 'Reduction in motor activity as reflected in slowing or lessening or movements and speech, diminished responsiveness of stimuli, and reduced body tone.',
      'G8 Uncooperativeness': 'Active refusal to comply with the will of significant others, including the interviewer, hospital staff or family, which may be associated with distrust, defensiveness, stubbornness, negativism, rejection of authority, hostility or belligerence.',
      'G9 Unusual thought content': 'Thinking characterised by strange, fantastic or bizarre ideas, ranging from those which are remote or atypical to those which are distorted, illogical and patently absurd.',
      'G10 Disorientation': 'Lack of awareness of one’s relationship to the milieu, including persons, place and time, which may be due to confusion or withdrawal.',
      'G11 Poor attention': 'Failure in focused alertness manifested by poor concentration, distractibility from internal and external stimuli, and difficulty in harnessing, sustaining or shifting focus to new stimuli.',
      'G12 Lack of judgement & insight': 'Impaired awareness or understanding of one’s own psychiatric condition and life situation.',
      'G13 Disturbance of volition': 'Disturbance in the wilful initiation, sustenance and control of one’s thoughts, behaviour, movements and speech.',
      'G14 Poor impulse control': 'Disordered regulation and control of action on inner urges, resulting in sudden, unmodulated, arbitrary or misdirected discharge of tension and emotions without concern about consequences.',
      'G15 Preoccupation': 'Absorption with internally generated thoughts and feelings and with autistic experiences to the detriment of reality orientation and adaptive behaviour.',
      'G16 Active social avoidance': 'Diminished social involvement associated with unwarranted fear, hostility, or distrust.',
    },
    scores: {
      1: 'Absent',
      2: 'Minimal',
      3: 'Mild',
      4: 'Moderate',
      5: 'Moderate Severe',
      6: 'Severe',
      7: 'Extreme',
    },
  }
};

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
      return;
    } else {
      toast('Client or evaluation not found', 'danger');
    }
  }

  if (CLIENT) {
    // if client exists, view client
    if (CLIENT < CLIENTS.length) {
      view(CLIENT);
      $('#loading').addClass('d-none');
      return;
    } else {
      toast('Client not found', 'danger');
    }
  }

  // render clients
  renderClients();
  
  $('#loading').addClass('d-none');
  $('#clients_page').removeClass('d-none');

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
      evaluations: {}
    };
  
    // add client to clients array
    CLIENTS.push(client);
  
    // save clients to local storage
    localStorage.setItem('clients', JSON.stringify(CLIENTS));
    try {
      await syncClients();
    } catch (error) {
      $('#syncClients').addClass('btn-warning');
      $('#syncClients').removeClass('btn-success')
      console.error(error);
    }
      
    // render clients
    renderClients();
  
    // show success toast
    toast('Client added successfully', 'success');
  
    // close modal
    $('#addClientModal').modal('hide');
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

    try {
      await syncClients();
    } catch (error) {
      $('#syncClients').addClass('btn-warning');
      $('#syncClients').removeClass('btn-success')
      console.error(error);
    }

    renderClients();
    toast('Client deleted successfully', 'success');
  });

  $('#client_view_page').on('click', '.back', function() {
    defaultView();
  });

  $('#client_evaluation_page').on('click', '.back', function() {
    defaultView();
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
  if (!CLIENTS.length > 0) {
    $('#clients_table').empty();
    $('#clients_table').append('<tr><td colspan="5" class="text-center">No clients found</td></tr>');
    return;
  };

  // render clients to table
  $('#clients_table').empty();
  CLIENTS.forEach((client, index) => {
    const tr = `
      <tr id="client_${index}">
        <td class="text-nowrap">${client.index + 1}</td>
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
  return client.evaluations.hasOwnProperty(evaluation);
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
      if (client.evaluations[evaluation] && client.evaluations[evaluation][question] == score) {
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
    if (!CLIENTS[index].evaluations[evaluation]) {
      CLIENTS[index].evaluations[evaluation] = {};
    }

    // add answer to client
    CLIENTS[index].evaluations[evaluation][question] = answer;

    // save clients to local storage
    localStorage.setItem('clients', JSON.stringify(CLIENTS));

    try {
      await syncClients();
    } catch (error) {
      $('#syncClients').addClass('btn-warning');
      $('#syncClients').removeClass('btn-success');
      console.error(error);
    }

    // show success toast
    toast('Assessment saved', 'success');
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
      if (!evaluations[evaluation][question]) {
        continue;
      }
      const questionDiv = $(`
        <div class="question">
          <h5><strong>${question}:</strong>
          <badge class="badge bg-primary">
            ${evaluations[evaluation][question]} ${scores[evaluations[evaluation][question]]}
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

const API = 'https://pagalkhanaevaluation-024d.restdb.io/rest/clientsdata';
// REST API for clients
async function getClients() {
  const response = await fetch(API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '65c77f3412be420d207b573c	',
    },
  });

  const data = await response.json();
  return data;
}

async function syncClients() {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '65c77f3412be420d207b573c	',
    },
    body: JSON.stringify(CLIENTS),
  });

  console.log(response)

  const data = await response.json();

  $('#syncClients').addClass('btn-success');
  $('#syncClients').removeClass('btn-warning');

  return data;
}

function eliminateDuplicates(arr) {
  return arr.filter((item, index) => {
    return arr.findIndex(t => t.name === item.name) === index;
  });
}
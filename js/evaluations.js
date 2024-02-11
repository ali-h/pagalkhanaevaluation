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
import * as t from '../../domain/types';

// Fictional East and West African names
export const seedPatients = [
  {
    id: 'CTK-00101',
    name: 'Amina Uwase',
    sex: 'F',
    dateOfBirth: '1978-03-15',
    phone: '+256701234567',
    facilityId: 'fac-001', // Kampala District Hospital
    conditions: [t.ConditionCode.HYPERTENSION, t.ConditionCode.DIABETES],
    smoking: t.SmokingStatus.NEVER,
    familyHistoryCvd: true,
    medications: [
      { name: 'Enalapril', dose: '10mg', frequency: 'once daily' },
      { name: 'Metformin', dose: '500mg', frequency: 'twice daily' }
    ],
    createdAt: new Date('2024-08-10')
  },
  {
    id: 'CTK-00102',
    name: 'Daniel Mensah',
    sex: 'M',
    dateOfBirth: '1965-07-22',
    phone: '+233501234567',
    facilityId: 'fac-002', // Kumasi Health Centre
    conditions: [t.ConditionCode.HYPERTENSION, t.ConditionCode.DYSLIPIDAEMIA],
    smoking: t.SmokingStatus.CURRENT,
    familyHistoryCvd: true,
    medications: [
      { name: 'Amlodipine', dose: '5mg', frequency: 'once daily' },
      { name: 'Atorvastatin', dose: '20mg', frequency: 'once daily' }
    ],
    createdAt: new Date('2024-07-20')
  },
  {
    id: 'CTK-00103',
    name: 'Chinedu Okafor',
    sex: 'M',
    dateOfBirth: '1972-11-08',
    phone: '+2348001234567',
    facilityId: 'fac-001', // Kampala District Hospital
    conditions: [t.ConditionCode.PRIOR_MI],
    smoking: t.SmokingStatus.FORMER,
    familyHistoryCvd: false,
    medications: [
      { name: 'Aspirin', dose: '75mg', frequency: 'once daily' },
      { name: 'Metoprolol', dose: '25mg', frequency: 'twice daily' },
      { name: 'Lisinopril', dose: '5mg', frequency: 'once daily' }
    ],
    createdAt: new Date('2024-06-15')
  },
  {
    id: 'CTK-00104',
    name: 'Grace Niyonzima',
    sex: 'F',
    dateOfBirth: '1982-05-30',
    phone: '+250788234567',
    facilityId: 'fac-003', // Kigali Referral Hospital
    conditions: [],
    smoking: t.SmokingStatus.NEVER,
    familyHistoryCvd: false,
    medications: [],
    createdAt: new Date('2024-09-01')
  },
  {
    id: 'CTK-00105',
    name: 'Samuel Kato',
    sex: 'M',
    dateOfBirth: '1955-12-12',
    phone: '+256701234568',
    facilityId: 'fac-001', // Kampala District Hospital
    conditions: [t.ConditionCode.HYPERTENSION, t.ConditionCode.HEART_FAILURE],
    smoking: t.SmokingStatus.NEVER,
    familyHistoryCvd: true,
    medications: [
      { name: 'Furosemide', dose: '40mg', frequency: 'once daily' },
      { name: 'Enalapril', dose: '10mg', frequency: 'once daily' },
      { name: 'Spironolactone', dose: '25mg', frequency: 'once daily' }
    ],
    createdAt: new Date('2024-05-10')
  },
  {
    id: 'CTK-00106',
    name: 'Miriam Adebayo',
    sex: 'F',
    dateOfBirth: '1990-02-18',
    phone: '+2348001234568',
    facilityId: 'fac-002', // Kumasi Health Centre
    conditions: [t.ConditionCode.DIABETES],
    smoking: t.SmokingStatus.NEVER,
    familyHistoryCvd: true,
    medications: [
      { name: 'Metformin', dose: '1000mg', frequency: 'twice daily' }
    ],
    createdAt: new Date('2024-08-05')
  },
  {
    id: 'CTK-00107',
    name: 'Kwame Boateng',
    sex: 'M',
    dateOfBirth: '1958-09-25',
    phone: '+233501234568',
    facilityId: 'fac-002', // Kumasi Health Centre
    conditions: [t.ConditionCode.ATRIAL_FIBRILLATION, t.ConditionCode.HYPERTENSION],
    smoking: t.SmokingStatus.FORMER,
    familyHistoryCvd: false,
    medications: [
      { name: 'Warfarin', dose: 'INR 2-3', frequency: 'once daily' },
      { name: 'Diltiazem', dose: '60mg', frequency: 'three times daily' },
      { name: 'Lisinopril', dose: '10mg', frequency: 'once daily' }
    ],
    createdAt: new Date('2024-04-12')
  },
  {
    id: 'CTK-00108',
    name: 'Nia Kimani',
    sex: 'F',
    dateOfBirth: '1988-06-07',
    phone: '+254712234567',
    facilityId: 'fac-003', // Kigali Referral Hospital
    conditions: [],
    smoking: t.SmokingStatus.NEVER,
    familyHistoryCvd: false,
    medications: [],
    createdAt: new Date('2024-09-05')
  },
  {
    id: 'CTK-00109',
    name: 'Kofi Mensah',
    sex: 'M',
    dateOfBirth: '1968-01-14',
    phone: '+233501234569',
    facilityId: 'fac-002', // Kumasi Health Centre
    conditions: [t.ConditionCode.HYPERTENSION, t.ConditionCode.DIABETES, t.ConditionCode.DYSLIPIDAEMIA],
    smoking: t.SmokingStatus.CURRENT,
    familyHistoryCvd: true,
    medications: [
      { name: 'Enalapril', dose: '10mg', frequency: 'once daily' },
      { name: 'Amlodipine', dose: '5mg', frequency: 'once daily' },
      { name: 'Metformin', dose: '500mg', frequency: 'twice daily' },
      { name: 'Atorvastatin', dose: '40mg', frequency: 'once daily' }
    ],
    createdAt: new Date('2024-03-20')
  },
  {
    id: 'CTK-00110',
    name: 'Zainab Hassan',
    sex: 'F',
    dateOfBirth: '1995-04-11',
    phone: '+254712234568',
    facilityId: 'fac-003', // Kigali Referral Hospital
    conditions: [],
    smoking: t.SmokingStatus.NEVER,
    familyHistoryCvd: true,
    medications: [],
    createdAt: new Date('2024-08-28')
  },
  {
    id: 'CTK-00111',
    name: 'Patrick Osei',
    sex: 'M',
    dateOfBirth: '1960-08-19',
    phone: '+233501234570',
    facilityId: 'fac-002', // Kumasi Health Centre
    conditions: [t.ConditionCode.PRIOR_STROKE, t.ConditionCode.HYPERTENSION, t.ConditionCode.DIABETES],
    smoking: t.SmokingStatus.CURRENT,
    familyHistoryCvd: true,
    medications: [
      { name: 'Clopidogrel', dose: '75mg', frequency: 'once daily' },
      { name: 'Aspirin', dose: '75mg', frequency: 'once daily' },
      { name: 'Lisinopril', dose: '10mg', frequency: 'once daily' },
      { name: 'Simvastatin', dose: '40mg', frequency: 'once daily' },
      { name: 'Metformin', dose: '500mg', frequency: 'twice daily' }
    ],
    createdAt: new Date('2024-02-14')
  },
  {
    id: 'CTK-00112',
    name: 'Fatima Ahmed',
    sex: 'F',
    dateOfBirth: '1975-10-03',
    phone: '+256701234570',
    facilityId: 'fac-001', // Kampala District Hospital
    conditions: [t.ConditionCode.HYPERTENSION],
    smoking: t.SmokingStatus.NEVER,
    familyHistoryCvd: false,
    medications: [
      { name: 'Hydrochlorothiazide', dose: '25mg', frequency: 'once daily' }
    ],
    createdAt: new Date('2024-07-08')
  },
  {
    id: 'CTK-00113',
    name: 'John Mwale',
    sex: 'M',
    dateOfBirth: '1970-03-27',
    phone: '+260789234567',
    facilityId: 'fac-001', // Kampala District Hospital
    conditions: [t.ConditionCode.DIABETES, t.ConditionCode.DYSLIPIDAEMIA],
    smoking: t.SmokingStatus.FORMER,
    familyHistoryCvd: true,
    medications: [
      { name: 'Glibenclamide', dose: '5mg', frequency: 'twice daily' },
      { name: 'Simvastatin', dose: '20mg', frequency: 'once daily' }
    ],
    createdAt: new Date('2024-06-22')
  },
  {
    id: 'CTK-00114',
    name: 'Abigail Okafor',
    sex: 'F',
    dateOfBirth: '1992-12-08',
    phone: '+2348001234569',
    facilityId: 'fac-002', // Kumasi Health Centre
    conditions: [],
    smoking: t.SmokingStatus.NEVER,
    familyHistoryCvd: false,
    medications: [],
    createdAt: new Date('2024-09-10')
  }
];

export const seedFacilities = [
  {
    id: 'fac-001',
    name: 'Kampala District Hospital',
    level: t.FacilityLevel.DISTRICT_HOSPITAL,
    district: 'Kampala',
    country: 'Uganda'
  },
  {
    id: 'fac-002',
    name: 'Kumasi Health Centre',
    level: t.FacilityLevel.HEALTH_CENTRE,
    district: 'Ashanti',
    country: 'Ghana'
  },
  {
    id: 'fac-003',
    name: 'Kigali Referral Hospital',
    level: t.FacilityLevel.REFERRAL_HOSPITAL,
    district: 'Kigali',
    country: 'Rwanda'
  }
];

export const seedClinicians = [
  {
    id: 'cli-001',
    name: 'Dr. Amara Diallo',
    role: t.UserRole.FRONTLINE,
    credentials: 'MD, General Medicine',
    facilityId: 'fac-001'
  },
  {
    id: 'cli-002',
    name: 'Nurse Olivia Mensah',
    role: t.UserRole.FRONTLINE,
    credentials: 'RN, Cardiology focus',
    facilityId: 'fac-002'
  },
  {
    id: 'cli-003',
    name: 'Clinical Officer Joseph Mwale',
    role: t.UserRole.FRONTLINE,
    credentials: 'CO, Diploma in Clinical Medicine',
    facilityId: 'fac-002'
  },
  {
    id: 'cli-004',
    name: 'Prof. Kwesi Appiah',
    role: t.UserRole.CARDIOLOGIST,
    credentials: 'MD, Board-certified Cardiologist',
    facilityId: 'fac-003'
  },
  {
    id: 'cli-005',
    name: 'Dr. Catherine Ndiaye',
    role: t.UserRole.CARDIOLOGIST,
    credentials: 'MD, Cardiologist',
    facilityId: 'fac-003'
  }
];

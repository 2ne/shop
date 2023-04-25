interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  meetsAgeCriteria?: boolean; // Used to cross-reference with BasketItem's ageCriteria
  medicalInfo?: MedicalInfo;
  emergencyContact?: EmergencyContact[];
  consentForms?: ConsentForm[];
  additionalForms?: AdditionalForm[];
  uploadedFiles?: UploadedFile[];
}

interface MedicalInfo {
  doctorsName?: string;
  surgeryAddress?: string;
  surgeryTelephone?: string;
  medicalConditions?: string;
  disabilities?: string;
  behaviouralConditions?: string;
  medicines?: string;
  allergies?: string;
  dietaryNeedsOrConditions?: string;
}

type MedicalInfoFieldKey = keyof MedicalInfo;

type MedicalInfoField = {
  key: MedicalInfoFieldKey;
  label: string;
  group: string;
};

export const medicalInfoFields: MedicalInfoField[] = [
  {
    key: "doctorsName",
    label: "Doctor's name",
    group: "doctorsDetails",
  },
  {
    key: "surgeryAddress",
    label: "Surgery address",
    group: "doctorsDetails",
  },
  {
    key: "surgeryTelephone",
    label: "Surgery telephone",
    group: "doctorsDetails",
  },
  {
    key: "medicalConditions",
    label: "Medical conditions",
    group: "medicalInformation",
  },
  { key: "medicines", label: "Medicines", group: "medicalInformation" },
  {
    key: "disabilities",
    label: "Disabilities",
    group: "medicalInformation",
  },
  {
    key: "behaviouralConditions",
    label: "Behavioural conditions",
    group: "medicalInformation",
  },
  { key: "allergies", label: "Allergies", group: "allergiesAndDietary" },
  {
    key: "dietaryNeedsOrConditions",
    label: "Dietary needs or other conditions",
    group: "allergiesAndDietary",
  },
];

interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
}

interface ConsentForm {
  id: number;
  title: string;
  signed: boolean;
}

interface AdditionalForm {
  id: number;
}

interface UploadedFile {
  id: number;
  fileName: string;
  url: string;
}

interface AgeCriteria {
  min?: number;
  max?: number;
}

interface BasketItem {
  id: string;
  title: string;
  subTitle?: string;
  image?: string;
  dates?: string;
  price?: string;
  cost?: string;
  billing?: string;
  participants?: Participant[];
  requiredProduct?: BasketItem;
  isRequiredProduct?: boolean;
  ageCriteria?: AgeCriteria;
}

export type {
  Participant,
  MedicalInfo,
  EmergencyContact,
  ConsentForm,
  AdditionalForm,
  UploadedFile,
  BasketItem,
  AgeCriteria,
};

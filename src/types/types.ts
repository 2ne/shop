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
  notes?: string;
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
    label: "Doctor's Name",
    group: "doctorsDetails",
  },
  {
    key: "surgeryAddress",
    label: "Surgery Address",
    group: "doctorsDetails",
  },
  {
    key: "surgeryTelephone",
    label: "Surgery Telephone",
    group: "doctorsDetails",
  },
  {
    key: "medicalConditions",
    label: "Medical Conditions",
    group: "medicalInformation",
  },
  {
    key: "disabilities",
    label: "Disabilities",
    group: "medicalInformation",
  },
  {
    key: "behaviouralConditions",
    label: "Behavioural Conditions",
    group: "medicalInformation",
  },
  { key: "medicines", label: "Medicines", group: "medications" },
  { key: "allergies", label: "Allergies", group: "allergiesAndDietary" },
  { key: "notes", label: "Notes", group: "allergiesAndDietary" },
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

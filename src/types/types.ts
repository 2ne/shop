interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  meetsAgeCriteria?: boolean; // Used to cross-reference with BasketItem's ageCriteria
}

interface medicalInfo {
  id: number;
}

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
  participant?: Participant;
  requiredProduct?: BasketItem;
  medicalInfo?: medicalInfo[];
  emergencyContact?: EmergencyContact[];
  consentForms?: ConsentForm[];
  additionalForms?: AdditionalForm[];
  uploadedFiles?: UploadedFile[];
  ageCriteria?: AgeCriteria;
}

export type {
  Participant,
  medicalInfo,
  EmergencyContact,
  ConsentForm,
  UploadedFile,
  BasketItem,
};

export type Agent = {
   id: string;
   name: string;
   user_id: string;
};

export type Complaint = {
   id: string | undefined;
   name?: string;
   email?: string;
   phone?: string;
   anon_complaint: boolean;
   relationship_with_company:
      | 'employee'
      | 'supplier'
      | 'customer'
      | 'partners'
      | 'exemployee'
      | 'other';
   witnesses: boolean;
   evidence: boolean;
   kind_of_abuse: ComplaintCategory;
   workspace?: ComplaintWorkplace;
   department?: ComplaintDepartment;
   reported_facts: string;
   documentation: any;
   password: string;
   agent?: Agent;
};

export type ComplaintCategory = {
   id: string;
   name: string;
};

export type ComplaintDepartment = {
   id: string;
   name: string;
};

export type ComplaintWorkplace = {
   id: string;
   name: string;
};

export type Agent = {
   id: string;
   name: string;
   user_id: string;
};

export type Complaint = {
   id: string | undefined;
   code?: string;
   fullname?: string;
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
   serious: boolean;
   resolution_category:
      | 'not_applicable'
      | 'appropriate_internal_resolution'
      | 'applicable_external_resolution'
      | 'appropriate_resolution_other'
      | null;
   resolution: any;
   date_created: string;
   date_updated: string | null;
   closed_date: string | null;
   end_date: string;
   validated_date: string | null;
   state:
      | 'open'
      | 'validated'
      | 'not_validated'
      | 'investigating'
      | 'resolved'
      | 'closed';
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

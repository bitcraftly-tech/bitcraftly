"use server";

import type { SubmitLeadActionInput } from "../services/lead-action.input";
import { submitLead } from "../services/lead.service";
import type { SubmitLeadResult } from "../services/lead.types";

export async function submitLeadAction(
  input: SubmitLeadActionInput,
): Promise<SubmitLeadResult> {
  return submitLead(input);
}

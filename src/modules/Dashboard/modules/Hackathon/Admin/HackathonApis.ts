import { AxiosError } from "axios";
import { privateGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";
import { HackList } from "../User/Hackathon";
import { SetStateAction } from "react";

export const getFormFields = async (
    setFormData: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getHackathonFormData,
        );
        const defaultForm: any = response?.data;
        setFormData(defaultForm.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getHackDetails = async (
    setEditData: React.Dispatch<SetStateAction<HackList | undefined>>,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getHackathons + id
        );
        const defaultForm: any = response?.data;
        setEditData(defaultForm.response);
		console.log(defaultForm.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const createHackathon = async (
    title: string,
    tagline: string,
    description: string,
    participantCount: number,
    orgId: string,
	districtId: string,
	place: string,
	isOpenToAll: boolean,
	applicationStart: string,
	applicationEnds: string,
	eventStart: string,
	eventEnd: string,
	formFields: any,
	logo: any
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.createHackathon,
            {
                title: title,
                tagline: tagline,
                description: description,
                participant_count: participantCount,
                orgId: orgId,
                districtId: districtId,
                place: place,
                is_open_to_all: isOpenToAll,
                application_start: applicationStart,
                application_ends: applicationEnds,
                event_start: eventStart,
                event_end: eventEnd,
                status: "Draft",
                form_fields: formFields,
                event_logo: logo
            },
            {
                maxBodyLength: Infinity,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        const message: any = response?.data;
        console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

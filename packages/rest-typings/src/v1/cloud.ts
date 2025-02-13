import type { CloudRegistrationIntentData, CloudConfirmationPollData, CloudRegistrationStatus } from '@rocket.chat/core-typings';
import Ajv from 'ajv';

const ajv = new Ajv({
	coerceTypes: true,
});

type CloudManualRegister = {
	cloudBlob: string;
};

const CloudManualRegisterSchema = {
	type: 'object',
	properties: {
		cloudBlob: {
			type: 'string',
		},
	},
	required: ['cloudBlob'],
	additionalProperties: false,
};

export const isCloudManualRegisterProps = ajv.compile<CloudManualRegister>(CloudManualRegisterSchema);

type CloudCreateRegistrationIntent = {
	resend: boolean;
	email: string;
};

const CloudCreateRegistrationIntentSchema = {
	type: 'object',
	properties: {
		resend: {
			type: 'boolean',
		},
		email: {
			type: 'string',
		},
	},
	required: ['resend', 'email'],
	additionalProperties: false,
};

export const isCloudCreateRegistrationIntentProps = ajv.compile<CloudCreateRegistrationIntent>(CloudCreateRegistrationIntentSchema);

type CloudConfirmationPoll = {
	deviceCode: string;
	resend?: string;
};

const CloudConfirmationPollSchema = {
	type: 'object',
	properties: {
		deviceCode: {
			type: 'string',
		},
		resend: {
			type: 'string',
			nullable: true,
		},
	},
	required: ['deviceCode'],
	optionalProperties: ['resend'],
	additionalProperties: false,
};

export const isCloudConfirmationPollProps = ajv.compile<CloudConfirmationPoll>(CloudConfirmationPollSchema);

export type CloudEndpoints = {
	'cloud.manualRegister': {
		POST: (params: CloudManualRegister) => void;
	};
	'cloud.createRegistrationIntent': {
		POST: (params: CloudCreateRegistrationIntent) => {
			intentData: CloudRegistrationIntentData;
		};
	};
	'cloud.confirmationPoll': {
		GET: (params: CloudConfirmationPoll) => {
			pollData: CloudConfirmationPollData;
		};
	};
	'cloud.registrationStatus': {
		GET: (params: void) => { registrationStatus: CloudRegistrationStatus };
	};
};

import type { ICustomUserStatus, IUserStatus } from '@rocket.chat/core-typings';
import Ajv from 'ajv';

import type { PaginatedRequest } from '../helpers/PaginatedRequest';
import type { PaginatedResult } from '../helpers/PaginatedResult';

const ajv = new Ajv({
	coerceTypes: true,
});

type CustomUserStatusListProps = PaginatedRequest<{ query: string }>;

const CustomUserStatusListSchema = {
	type: 'object',
	properties: {
		count: {
			type: 'number',
			nullable: true,
		},
		offset: {
			type: 'number',
			nullable: true,
		},
		sort: {
			type: 'string',
			nullable: true,
		},
		query: {
			type: 'string',
		},
	},
	required: ['query'],
	additionalProperties: false,
};

export const isCustomUserStatusListProps = ajv.compile<CustomUserStatusListProps>(CustomUserStatusListSchema);

export type CustomUserStatusEndpoints = {
	'custom-user-status.list': {
		GET: (params: CustomUserStatusListProps) => PaginatedResult<{
			statuses: IUserStatus[];
		}>;
	};
	'custom-user-status.create': {
		POST: (params: { name: string; statusType?: string }) => {
			customUserStatus: ICustomUserStatus;
		};
	};
	'custom-user-status.delete': {
		POST: (params: { customUserStatusId: string }) => void;
	};
	'custom-user-status.update': {
		POST: (params: { id: string; name?: string; statusType?: string }) => {
			customUserStatus: ICustomUserStatus;
		};
	};
};

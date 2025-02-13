import type { IRoom } from '@rocket.chat/core-typings';
import Ajv from 'ajv';

import type { PaginatedRequest } from '../helpers/PaginatedRequest';
import type { PaginatedResult } from '../helpers/PaginatedResult';

const ajv = new Ajv({
	coerceTypes: true,
});

type DirectoryProps = PaginatedRequest<{}>;

const DirectorySchema = {
	type: 'object',
	properties: {
		query: {
			type: 'string',
			nullable: true,
		},
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
	},
	additionalProperties: false,
};

export const isDirectoryProps = ajv.compile<DirectoryProps>(DirectorySchema);

export type DirectoryEndpoint = {
	directory: {
		GET: (params: DirectoryProps) => PaginatedResult<{ result: IRoom[] }>;
	};
};

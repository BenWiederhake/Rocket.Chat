import type {
	IQueueSummary,
	ILivechatAgent,
	IVoipRoom,
	IUser,
	IQueueMembershipDetails,
	IQueueMembershipSubscription,
	IVoipExtensionWithAgentInfo,
	IManagementServerConnectionStatus,
	IRegistrationInfo,
} from '@rocket.chat/core-typings';
import { VoipClientEvents } from '@rocket.chat/core-typings';
import Ajv, { JSONSchemaType } from 'ajv';

import type { PaginatedRequest } from '../helpers/PaginatedRequest';
import type { PaginatedResult } from '../helpers/PaginatedResult';

const ajv = new Ajv({
	coerceTypes: true,
});

/** *************************************************/
type CustomSoundsList = PaginatedRequest<{ query: string }>;

const CustomSoundsListSchema: JSONSchemaType<CustomSoundsList> = {
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
			nullable: true,
		},
	},
	required: [],
	additionalProperties: false,
};

export const isCustomSoundsListProps = ajv.compile<CustomSoundsList>(CustomSoundsListSchema);

type ConnectorExtensionGetRegistrationInfoByUserId = { id: string };

const ConnectorExtensionGetRegistrationInfoByUserIdSchema: JSONSchemaType<ConnectorExtensionGetRegistrationInfoByUserId> = {
	type: 'object',
	properties: {
		id: {
			type: 'string',
		},
	},
	required: ['id'],
	additionalProperties: false,
};

export const isConnectorExtensionGetRegistrationInfoByUserIdProps = ajv.compile<ConnectorExtensionGetRegistrationInfoByUserId>(
	ConnectorExtensionGetRegistrationInfoByUserIdSchema,
);

type VoipQueuesGetQueuedCallsForThisExtension = { extension: string };

const VoipQueuesGetQueuedCallsForThisExtensionSchema: JSONSchemaType<VoipQueuesGetQueuedCallsForThisExtension> = {
	type: 'object',
	properties: {
		extension: {
			type: 'string',
		},
	},
	required: ['extension'],
	additionalProperties: false,
};

export const isVoipQueuesGetQueuedCallsForThisExtensionProps = ajv.compile<VoipQueuesGetQueuedCallsForThisExtension>(
	VoipQueuesGetQueuedCallsForThisExtensionSchema,
);

type VoipQueuesGetMembershipSubscription = { extension: string };

const VoipQueuesGetMembershipSubscriptionSchema: JSONSchemaType<VoipQueuesGetMembershipSubscription> = {
	type: 'object',
	properties: {
		extension: {
			type: 'string',
		},
	},
	required: ['extension'],
	additionalProperties: false,
};

export const isVoipQueuesGetMembershipSubscriptionProps = ajv.compile<VoipQueuesGetMembershipSubscription>(
	VoipQueuesGetMembershipSubscriptionSchema,
);

type OmnichannelExtensions = PaginatedRequest<{
	status?: string;
	agentId?: string;
	queues?: string[];
	extension?: string;
}>;

const OmnichannelExtensionsSchema: JSONSchemaType<OmnichannelExtensions> = {
	type: 'object',
	properties: {
		status: {
			type: 'string',
			nullable: true,
		},
		agentId: {
			type: 'string',
			nullable: true,
		},
		queues: {
			type: 'array',
			items: {
				type: 'string',
			},
			nullable: true,
		},
		extension: {
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
		query: {
			type: 'string',
			nullable: true,
		},
	},
	required: [],
	additionalProperties: false,
};

export const isOmnichannelExtensionsProps = ajv.compile<OmnichannelExtensions>(OmnichannelExtensionsSchema);

type OmnichannelExtension =
	| {
			userId: string;
			type: 'free' | 'allocated' | 'available';
	  }
	| {
			username: string;
			type: 'free' | 'allocated' | 'available';
	  };

const OmnichannelExtensionSchema: JSONSchemaType<OmnichannelExtension> = {
	oneOf: [
		{
			type: 'object',
			properties: {
				userId: {
					type: 'string',
				},
				type: {
					type: 'string',
					enum: ['free', 'allocated', 'available'],
				},
			},
			required: ['userId', 'type'],
			additionalProperties: false,
		},
		{
			type: 'object',
			properties: {
				username: {
					type: 'string',
				},
				type: {
					type: 'string',
					enum: ['free', 'allocated', 'available'],
				},
			},
			required: ['username', 'type'],
			additionalProperties: false,
		},
	],
};

export const isOmnichannelExtensionProps = ajv.compile<OmnichannelExtension>(OmnichannelExtensionSchema);

type OmnichannelAgentExtensionGET = { username: string };

const OmnichannelAgentExtensionGETSchema: JSONSchemaType<OmnichannelAgentExtensionGET> = {
	type: 'object',
	properties: {
		username: {
			type: 'string',
		},
	},
	required: ['username'],
	additionalProperties: false,
};

export const isOmnichannelAgentExtensionGETProps = ajv.compile<OmnichannelAgentExtensionGET>(OmnichannelAgentExtensionGETSchema);

type OmnichannelAgentExtensionPOST = { userId: string; extension: string } | { username: string; extension: string };

const OmnichannelAgentExtensionPOSTSchema: JSONSchemaType<OmnichannelAgentExtensionPOST> = {
	oneOf: [
		{
			type: 'object',
			properties: {
				userId: {
					type: 'string',
				},
				extension: {
					type: 'string',
				},
			},
			required: ['userId', 'extension'],
			additionalProperties: false,
		},
		{
			type: 'object',
			properties: {
				username: {
					type: 'string',
				},
				extension: {
					type: 'string',
				},
			},
			required: ['username', 'extension'],
			additionalProperties: false,
		},
	],
};

export const isOmnichannelAgentExtensionPOSTProps = ajv.compile<OmnichannelAgentExtensionPOST>(OmnichannelAgentExtensionPOSTSchema);

type OmnichannelAgentExtensionDELETE = { username: string };

const OmnichannelAgentExtensionDELETESchema: JSONSchemaType<OmnichannelAgentExtensionDELETE> = {
	type: 'object',
	properties: {
		username: {
			type: 'string',
		},
	},
	required: ['username'],
	additionalProperties: false,
};

export const isOmnichannelAgentExtensionDELETEProps = ajv.compile<OmnichannelAgentExtensionDELETE>(OmnichannelAgentExtensionDELETESchema);

type OmnichannelAgentsAvailable = PaginatedRequest<{ text?: string; includeExtension?: string }>;

const OmnichannelAgentsAvailableSchema: JSONSchemaType<OmnichannelAgentsAvailable> = {
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
			nullable: true,
		},
		text: {
			type: 'string',
			nullable: true,
		},
		includeExtension: {
			type: 'string',
			nullable: true,
		},
	},
	required: [],
	additionalProperties: false,
};

export const isOmnichannelAgentsAvailableProps = ajv.compile<OmnichannelAgentsAvailable>(OmnichannelAgentsAvailableSchema);

type VoipEvents = { event: VoipClientEvents; rid: string; comment?: string };

const VoipEventsSchema: JSONSchemaType<VoipEvents> = {
	type: 'object',
	properties: {
		event: {
			type: 'string',
			enum: Object.values(VoipClientEvents),
		},
		rid: {
			type: 'string',
		},
		comment: {
			type: 'string',
			nullable: true,
		},
	},
	required: ['event', 'rid'],
	additionalProperties: false,
};

export const isVoipEventsProps = ajv.compile<VoipEvents>(VoipEventsSchema);

type VoipRoom = { token: string; agentId: ILivechatAgent['_id'] } | { rid: string; token: string };

const VoipRoomSchema: JSONSchemaType<VoipRoom> = {
	oneOf: [
		{
			type: 'object',
			properties: {
				token: {
					type: 'string',
				},
				agentId: {
					type: 'string',
				},
			},
			required: ['token', 'agentId'],
			additionalProperties: false,
		},
		{
			type: 'object',
			properties: {
				rid: {
					type: 'string',
				},
				token: {
					type: 'string',
				},
			},
			required: ['rid', 'token'],
			additionalProperties: false,
		},
	],
};

export const isVoipRoomProps = ajv.compile<VoipRoom>(VoipRoomSchema);

type VoipManagementServerCheckConnection = { host: string; port: string; username: string; password: string };

const VoipManagementServerCheckConnectionSchema: JSONSchemaType<VoipManagementServerCheckConnection> = {
	type: 'object',
	properties: {
		host: {
			type: 'string',
		},
		port: {
			type: 'string',
		},
		username: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
	},
	required: ['host', 'port', 'username', 'password'],
	additionalProperties: false,
};

export const isVoipManagementServerCheckConnectionProps = ajv.compile<VoipManagementServerCheckConnection>(
	VoipManagementServerCheckConnectionSchema,
);

type VoipCallServerCheckConnection = { websocketUrl: string; host: string; port: string; path: string };

const VoipCallServerCheckConnectionSchema: JSONSchemaType<VoipCallServerCheckConnection> = {
	type: 'object',
	properties: {
		websocketUrl: {
			type: 'string',
		},
		host: {
			type: 'string',
		},
		port: {
			type: 'string',
		},
		path: {
			type: 'string',
		},
	},
	required: ['websocketUrl', 'host', 'port', 'path'],
	additionalProperties: false,
};

export const isVoipCallServerCheckConnectionProps = ajv.compile<VoipCallServerCheckConnection>(VoipCallServerCheckConnectionSchema);

type VoipRooms = {
	agents?: string[];
	open?: 'true' | 'false';
	createdAt?: string;
	closedAt?: string;
	tags?: string[];
	queue?: string;
	visitorId?: string;
};

const VoipRoomsSchema: JSONSchemaType<VoipRooms> = {
	type: 'object',
	properties: {
		agents: {
			type: 'array',
			items: {
				type: 'string',
			},
			nullable: true,
		},
		open: {
			type: 'string',
			enum: ['true', 'false'],
			nullable: true,
		},
		createdAt: {
			type: 'string',
			nullable: true,
		},
		closedAt: {
			type: 'string',
			nullable: true,
		},
		tags: {
			type: 'array',
			items: {
				type: 'string',
			},
			nullable: true,
		},
		queue: {
			type: 'string',
			nullable: true,
		},
		visitorId: {
			type: 'string',
			nullable: true,
		},
	},
	required: [],
	additionalProperties: false,
};

export const isVoipRoomsProps = ajv.compile<VoipRooms>(VoipRoomsSchema);

type VoipRoomClose = { rid: string; token: string; comment: string; tags?: string[] };

const VoipRoomCloseSchema: JSONSchemaType<VoipRoomClose> = {
	type: 'object',
	properties: {
		rid: {
			type: 'string',
		},
		token: {
			type: 'string',
		},
		comment: {
			type: 'string',
		},
		tags: {
			type: 'array',
			items: {
				type: 'string',
			},
			nullable: true,
		},
	},
	required: ['rid', 'token', 'comment'],
	additionalProperties: false,
};

export const isVoipRoomCloseProps = ajv.compile<VoipRoomClose>(VoipRoomCloseSchema);

export type VoipEndpoints = {
	'connector.extension.getRegistrationInfoByUserId': {
		GET: (params: ConnectorExtensionGetRegistrationInfoByUserId) => IRegistrationInfo | { result: string };
	};
	'voip/queues.getSummary': {
		GET: () => { summary: IQueueSummary[] };
	};
	'voip/queues.getQueuedCallsForThisExtension': {
		GET: (params: VoipQueuesGetQueuedCallsForThisExtension) => IQueueMembershipDetails;
	};
	'voip/queues.getMembershipSubscription': {
		GET: (params: VoipQueuesGetMembershipSubscription) => IQueueMembershipSubscription;
	};
	'omnichannel/extensions': {
		GET: (params: OmnichannelExtensions) => PaginatedResult<{ extensions: IVoipExtensionWithAgentInfo[] }>;
	};
	'omnichannel/extension': {
		GET: (params: OmnichannelExtension) => {
			extensions: string[];
		};
	};
	'omnichannel/agent/extension': {
		GET: (params: OmnichannelAgentExtensionGET) => { extension: Pick<IUser, '_id' | 'username' | 'extension'> };
		POST: (params: OmnichannelAgentExtensionPOST) => void;
		DELETE: (params: OmnichannelAgentExtensionDELETE) => void;
	};
	'omnichannel/agents/available': {
		GET: (params: OmnichannelAgentsAvailable) => PaginatedResult<{ agents: ILivechatAgent[] }>;
	};
	'voip/events': {
		POST: (params: VoipEvents) => void;
	};
	'voip/room': {
		GET: (params: VoipRoom) => {
			room: IVoipRoom;
			newRoom: boolean;
		};
	};
	'voip/managementServer/checkConnection': {
		GET: (params: VoipManagementServerCheckConnection) => IManagementServerConnectionStatus;
	};
	'voip/callServer/checkConnection': {
		GET: (params: VoipCallServerCheckConnection) => IManagementServerConnectionStatus;
	};
	'voip/rooms': {
		GET: (params: VoipRooms) => PaginatedResult<{ rooms: IVoipRoom[] }>;
	};
	'voip/room.close': {
		POST: (params: VoipRoomClose) => { rid: string };
	};
};

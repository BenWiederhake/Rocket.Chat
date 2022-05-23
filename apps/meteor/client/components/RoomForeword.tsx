import { IRoom, isVoipRoom, isDirectMessageRoom } from '@rocket.chat/core-typings';
import { Avatar, Margins, Flex, Box, Tag } from '@rocket.chat/fuselage';
import { useUser, useUserRoom, useTranslation } from '@rocket.chat/ui-contexts';
import React, { ReactElement } from 'react';

import RoomForewordAvatar from './RoomForewordAvatar';
import { VoipRoomForeword } from './voip/room/VoipRoomForeword';

type RoomForewordProps = { _id: IRoom['_id']; rid?: IRoom['_id'] } | { rid: IRoom['_id']; _id?: IRoom['_id'] };

const RoomForeword = ({ _id, rid }: RoomForewordProps): ReactElement | null => {
	const roomId = _id || rid;
	if (!roomId) {
		throw new Error('Room id required - RoomForeword');
	}

	const t = useTranslation();

	const user = useUser();
	const room = useUserRoom(roomId);

	if (!room) {
		return null;
	}

	if (isVoipRoom(room)) {
		return <VoipRoomForeword room={room} />;
	}

	if (!isDirectMessageRoom(room)) {
		return (
			<Box fontScale='c1' color='default' display='flex' justifyContent='center'>
				{t('Start_of_conversation')}
			</Box>
		);
	}

	const usernames = room.usernames?.filter((username) => username !== user?.username);
	const uids = room.uids?.filter((uid) => uid !== user?._id);
	if (!usernames || usernames.length < 1) {
		return null;
	}

	return (
		<Box is='div' flexGrow={1} display='flex' justifyContent='center' flexDirection='column'>
			<Flex.Item grow={1}>
				<Margins block='x24'>
					<Avatar.Stack>
						{usernames.map((username, index) => (
							<RoomForewordAvatar uid={uids[index]} username={username} key={index} />
						))}
					</Avatar.Stack>
				</Margins>
			</Flex.Item>
			<Box display='flex' color='default' fontScale='h2' flexGrow={1} justifyContent='center'>
				{t('Direct_message_you_have_joined')}
			</Box>
			<Box is='div' mb='x8' flexGrow={1} display='flex' justifyContent='center'>
				{usernames.map((username, index) => (
					<Margins inline='x4' key={index}>
						<Box is='a' href={`/direct/${username}`}>
							<Tag variant='secondary' className='mention-link' data-username={username} medium>
								{username}
							</Tag>
						</Box>
					</Margins>
				))}
			</Box>
		</Box>
	);
};

export default RoomForeword;

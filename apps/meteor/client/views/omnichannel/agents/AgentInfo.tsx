import { Box, Margins, ButtonGroup } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import React, { HTMLAttributes, memo } from 'react';

import { FormSkeleton } from '../../../components/Skeleton';
import { UserStatus } from '../../../components/UserStatus';
import VerticalBar from '../../../components/VerticalBar';
import { AsyncStatePhase } from '../../../hooks/useAsyncState';
import { useEndpointData } from '../../../hooks/useEndpointData';
import UserInfo from '../../room/contextualBar/UserInfo';
import { useFormsSubscription } from '../additionalForms';
import AgentInfoAction from './AgentInfoAction';

type AgentInfoProps = {
	uid: string;
} & Omit<HTMLAttributes<HTMLElement>, 'is'>;

export const AgentInfo = memo<AgentInfoProps>(function AgentInfo({ uid, children, ...props }) {
	const t = useTranslation();
	const result = useEndpointData(`livechat/users/agent/${uid}`);

	const { useMaxChatsPerAgentDisplay } = useFormsSubscription();

	const MaxChats = useMaxChatsPerAgentDisplay?.();

	if (result.phase === AsyncStatePhase.LOADING) {
		return <FormSkeleton />;
	}

	if (result.phase === AsyncStatePhase.REJECTED) {
		return <Box mbs='x16'>{t('User_not_found')}</Box>;
	}

	const { user } = result.value;
	const { username, statusLivechat, status: userStatus } = user;

	return (
		<VerticalBar.ScrollableContent p='x24' {...props}>
			<Box alignSelf='center'>
				<UserInfo.Avatar size='x332' username={username} />
			</Box>

			<ButtonGroup mi='neg-x4' flexShrink={0} flexWrap='nowrap' withTruncatedText justifyContent='center'>
				{children}
			</ButtonGroup>

			<Margins block='x4'>
				<Box mb='x2'>
					<UserInfo.Username username={username} status={<UserStatus status={userStatus} />} />
				</Box>

				{statusLivechat && (
					<>
						<UserInfo.Label>{t('Livechat_status')}</UserInfo.Label>
						<UserInfo.Info>{t(statusLivechat === 'available' ? 'Available' : 'Not_Available')}</UserInfo.Info>
					</>
				)}

				{MaxChats && <MaxChats data={user} />}
			</Margins>
		</VerticalBar.ScrollableContent>
	);
});

export default Object.assign(AgentInfo, {
	Action: AgentInfoAction,
});

import React from 'react';
import TitledGreyBox from '@/components/elements/TitledGreyBox';
import { ServerContext } from '@/state/server';
import { useStoreState } from 'easy-peasy';
import RenameServerBox from '@/components/server/settings/RenameServerBox';
import FlashMessageRender from '@/components/FlashMessageRender';
import Can from '@/components/elements/Can';
import ReinstallServerBox from '@/components/server/settings/ReinstallServerBox';
import tw from 'twin.macro';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import { LinkButton } from '@/components/elements/Button';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import isEqual from 'react-fast-compare';
import CopyOnClick from '@/components/elements/CopyOnClick';
import lang from '../../../../../lang.json';

export default () => {
    const username = useStoreState(state => state.user.data!.username);
    const id = ServerContext.useStoreState(state => state.server.data!.id);
    const uuid = ServerContext.useStoreState(state => state.server.data!.uuid);
    const node = ServerContext.useStoreState(state => state.server.data!.node);
    const sftp = ServerContext.useStoreState(state => state.server.data!.sftpDetails, isEqual);

    return (
        <ServerContentBlock title={'Settings'}>
            <FlashMessageRender byKey={'settings'} css={tw`mb-4`}/>
            <div css={tw`md:flex`}>
                <div css={tw`w-full md:flex-1 md:mr-10`}>
                    <Can action={'file.sftp'}>
                        <TitledGreyBox title={lang.sftp_details} css={tw`mb-6 md:mb-10`}>
                            <div>
                                <Label>{lang.sftp_server_address}</Label>
                                <CopyOnClick text={`sftp://${sftp.ip}:${sftp.port}`}>
                                    <Input
                                        type={'text'}
                                        value={`sftp://${sftp.ip}:${sftp.port}`}
                                        readOnly
                                    />
                                </CopyOnClick>
                            </div>
                            <div css={tw`mt-6`}>
                                <Label>{lang.sftp_username}</Label>
                                <CopyOnClick text={`${username}.${id}`}>
                                    <Input
                                        type={'text'}
                                        value={`${username}.${id}`}
                                        readOnly
                                    />
                                </CopyOnClick>
                            </div>
                            <div css={tw`mt-6 flex items-center`}>
                                <div css={tw`flex-1`}>
                                    <div css={tw`border-l-4 border-cyan-500 p-3`}>
                                        <p css={tw`text-xs text-neutral-200`}>
                                            {lang.sftp_pass_same_as_panel}
                                        </p>
                                    </div>
                                </div>
                                <div css={tw`ml-4`}>
                                    <LinkButton
                                        isSecondary
                                        href={`sftp://${username}.${id}@${sftp.ip}:${sftp.port}`}
                                    >
                                        {lang.sftp_launch_button}
                                    </LinkButton>
                                </div>
                            </div>
                        </TitledGreyBox>
                    </Can>
                    <TitledGreyBox title={lang.debug_information} css={tw`mb-6 md:mb-10`}>
                        <div css={tw`flex items-center justify-between text-sm`}>
                            <p>{lang.d_node}</p>
                            <code css={tw`font-mono bg-neutral-900 rounded py-1 px-2`}>{node}</code>
                        </div>
                        <CopyOnClick text={uuid}>
                            <div css={tw`flex items-center justify-between mt-2 text-sm`}>
                                <p>{lang.d_server_id}</p>
                                <code css={tw`font-mono bg-neutral-900 rounded py-1 px-2`}>{uuid}</code>
                            </div>
                        </CopyOnClick>
                    </TitledGreyBox>
                </div>
                <div css={tw`w-full mt-6 md:flex-1 md:mt-0`}>
                    <Can action={'settings.rename'}>
                        <div css={tw`mb-6 md:mb-10`}>
                            <RenameServerBox/>
                        </div>
                    </Can>
                    <Can action={'settings.reinstall'}>
                        <ReinstallServerBox/>
                    </Can>
                </div>
            </div>
        </ServerContentBlock>
    );
};

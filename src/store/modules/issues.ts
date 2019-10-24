import {IssueMapper} from '../../core/entities/issue/mapper';
import {RequestCriteria} from '../../core/services/request-criteria';
import NotificationConfig from '../../core/config/notification-config';
import {ActionContext} from 'vuex';
import {Issue} from '@/core/entities/issue/model';

export const ISSUES_MUTATIONS = {
    setIssues: 'setIssues',
};

export const ISSUES_ACTIONS = {
    loadIssues: 'loadIssues',
};

export interface IssuesState {
    issues: Issue[];
}

const state: IssuesState = {
    issues: [],
};

export default {
    state,
    mutations: {
        [ISSUES_MUTATIONS.setIssues]: (issuesState: IssuesState, issues: Issue[]) => {
            issuesState.issues = issues;
        },
    },
    getters: {
        getIssues: (issuesState: IssuesState): Issue[] => issuesState.issues,
    },
    actions: {
        [ISSUES_ACTIONS.loadIssues]: (context: ActionContext<IssuesState, any>): Promise<any> => {
            return new Promise<any>(async (resolve, reject) => {
                try {
                    const mapper = new IssueMapper();
                    const taskUrl = context.getters.getTaskUrl;
                    const criteria = new RequestCriteria({condition: {issue: [taskUrl]}});

                    const issuesCollection = await mapper.getAll(criteria);
                    context.commit(ISSUES_MUTATIONS.setIssues, issuesCollection.getEntities());

                    resolve();
                } catch (exception) {
                    reject(exception.message);
                }
            });
        },
    },
};

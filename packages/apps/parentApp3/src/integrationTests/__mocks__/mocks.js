import { rest } from 'msw';

export const theRattlinBog = {
  refId: 'Ho Ro',
  firstName: 'The bog',
  lastName: 'Down in the valley oh',
  fullName: 'The bog Down in the valley oh',
};

export const theHoleInTheBog = {
  refId: 'theHoleInTheBogRefId',
  title:
    'Ho ro, the rattlin bog',
};

export const currentTreeId = 'Limbs on the branch and the branch on the tree and the tree in the hole and the hole in the bog and the bog down in the valley-o';

export const handlers = [
  rest.post(`/api/bog`, async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: {
            firstName: theRattlinBog.firstName,
            lastName: theRattlinBog.lastName,
          },
          refId: theRattlinBog.refId,
        },
      ]),
    );
  }),
  rest.get(
    `/api/bog/hole/${theHoleInTheBog.refId}`,
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            activities: [
              {
                refId: '98967006-63bd-4471-8eed-de1eba6d3856',
              },
            ],
            bogRefId: theRattlinBog.refId,
            holeRefId: theHoleInTheBog.refId,
            title: theHoleInTheBog.title,
          },
        ]),
      );
    },
  ),
  rest.post(
    `/api/bog/hole/tree`,
    async (req, res, ctx) => {
      return res(ctx.status(200));
    },
  ),
];

export const handlerForBranchesUnavailableOnTheTree = [
  rest.post(
    `/api/bog/hole/tree/branch`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ok: false,
          error: 'no_permission_to_get_branches',
        }),
      );
    },
  ),
];

export const handlerForNoBranchOnTheTree = [
  rest.post(
    `/api/bog/hole/tree/branch`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ok: true,
          result: [],
        }),
      );
    },
  ),
];

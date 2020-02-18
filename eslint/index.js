/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports.rules = {
  'no-query-without-knex': (context) => {
    return {
      CallExpression(node) {
        if (node.callee.property) {
          const { object } = node.callee
          const functionName = node.callee.property.name
          if (object && functionName === 'query' && node.arguments.length < 1) {
            context.report({
              node,
              message: 'Objection model function `query` must be passed a knex or transaction object',
              fix(fixer) {
                return [
                  fixer.replaceTextRange([node.end - 2, node.end], '(knex)'),
                ]
              },
            })
          }
        }
      },
    }
  },
}

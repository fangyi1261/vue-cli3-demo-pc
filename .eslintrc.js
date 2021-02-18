// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['off', { //禁止给参数重新赋值
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.return value
      ]
    }],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': 0,
    // key 值前面是否要有空格
    'key-spacing': [0, {
      'singleLine': {
        'beforeColon': false,
        'afterColon': true
      },
      'multiLine': {
        'beforeColon': true,
        'afterColon': true,
        'align': 'colon'
      }
    }],
    "no-bitwise": 0, // 禁止使用按位运算符
    "no-const-assign": 2,//禁止修改const声明的变量
    "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-dupe-args": 2,//函数参数不能重复
    "no-duplicate-case": 2,//switch中的case标签不能重复
    "no-empty": 2,//块语句中的内容不能为空
    "no-empty-character-class": 2,//正则表达式中的[]内容不能为空
    "no-empty-label": 0,//禁止使用空label
    "no-extra-semi": 2,//禁止多余的冒号
    "no-func-assign": 2,//禁止重复的函数声明
    "no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
    "no-irregular-whitespace": 2,//不能有不规则的空格
    "linebreak-style": [0, "windows"],//换行风格
    "no-multi-spaces": 1,//不能用多余的空格
    "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
    "no-new": 1,//禁止在使用new构造一个实例后不赋值
    "no-plusplus": 0,//禁止使用++，--
    "no-process-env": 0,//禁止使用process.env
    "no-proto": 2,//禁止使用__proto__属性
    "no-redeclare": 2,//禁止重复声明变量
    "no-return-assign": 1,//return 语句中不能有赋值表达式
    "no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
    "no-ternary": 0,//禁止使用三目运算符
    "no-trailing-spaces": 1,//一行结束后面不要有空格
    "no-this-before-super": 0,//在调用super()之前不能使用this或super
    "no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
    "no-undef": 1,//不能有未定义的变量
    "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
    "no-use-before-define": 2,//未定义前不能使用
    "no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注
    "array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
    "arrow-parens": 0,//箭头函数用小括号括起来
    "arrow-spacing": 0,//=>的前/后括号
    "brace-style": [1, "1tbs"],//大括号风格
    "camelcase": 2,//强制驼峰法命名
    "comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
    "comma-spacing": 0,//逗号前后的空格
    "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
    "curly": [2, "all"],//必须使用 if(){} 中的{}
    "default-case": 2,//switch语句最后必须有default
    "eqeqeq": 2,//必须使用全等
    "func-names": 0,//函数表达式必须有名字
    "func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
    "generator-star-spacing": 0,//生成器函数*的前后空格
    "id-length": 0,//变量名长度
    "indent": [2],//缩进风格
    "init-declarations": 0,//声明时必须赋初值
    // "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
    "max-len": [0, 80, 4],//字符串最大长度
    "newline-after-var": 2,//变量声明后是否需要空一行
    "one-var": 1,//连续声明
    "operator-assignment": [0, "always"],//赋值运算符 += -=什么的
    "operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
    "padded-blocks": 0,//块语句内行首行尾是否要空行
    "quotes": [1, "single"],//引号类型 `` "" ''
    // "quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号
    // "radix": 2,//parseInt必须指定第二个参数
    "id-match": 0,//命名检测
    "semi": [2, "always"],//语句强制分号结尾
    "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
    "space-after-keywords": [0, "always"],//关键字后面是否要空一格
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    "space-in-parens": [0, "never"],//小括号里面要不要有空格
    "space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
    "spaced-comment": 1,//注释风格要不要有空格什么的
    "strict": 2,//使用严格模式
    "use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
    "valid-typeof": 2,//必须使用合法的typeof的值
    "wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
    "wrap-regex": 0,//正则表达式字面量用小括号包起来
    "vue/singleline-html-element-content-newline": "off"
  },
  globals: {
    process: true,
    $http: true
  }
}
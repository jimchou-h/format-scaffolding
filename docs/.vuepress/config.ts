import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/index.md' },
      {		
				text: '编码规范',
				children: [
					{ text: 'HTML 编码规范', link: '/coding/html.md' },
					{ text: 'CSS 编码规范', link: '/coding/css.md' },
					{ text: 'JavaScript 编码规范', link: '/coding/javascript.md' },
					{ text: 'Node 编码规范', link: '/coding/node.md' },
					{ text: 'Typescript 编码规范', link: '/coding/typescript.md' },
				],
			},
      {
				text: '工程规范',
				children: [
					{ text: 'Git 规范', link: '/engineering/git.md' },
					{ text: '文档规范', link: '/engineering/doc.md' },
					{ text: 'CHANGELOG 规范', link: '/engineering/changelog.md' },
				],
			},
    ],
    sidebar: [
      {
				text: '编码规范',
				children: [
					{
						text: 'HTML 编码规范',
						link: '/coding/html.md',
					},
					{
						text: 'CSS 编码规范',
						link: '/coding/css.md',
					},
					{
						text: 'JavaScript 编码规范',
						link: '/coding/javascript.md',
					},
					{
						text: 'Node 编码规范',
						link: '/coding/node.md',
					},
					{
						text: 'Typescript 编码规范',
						link: '/coding/typescript.md',
					},
				],
			},
      {
				text: '工程规范',
				children: [
					{
						text: 'Git 规范',
						link: '/engineering/git.md',
					},
					{
						text: '文档规范',
						link: '/engineering/doc.md',
					},
					{
						text: 'CHANGELOG 规范',
						link: '/engineering/changelog.md',
					},
				],
			},
    ]
  }),

  lang: 'zh-CN',
  title: '代码规范',
  description: '',
	base: "/format-scaffolding/"
})
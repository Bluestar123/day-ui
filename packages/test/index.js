import DTest from './src/test.vue'

DTest.install = app => {
  app.component(DTest.name, DTest)
}

export default DTest

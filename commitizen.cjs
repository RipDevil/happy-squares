"use strict";

module.exports = {
  types: [
    {
      value: "build",
      name: "build:     Сборка проекта или изменения внешних зависимостей"
    },
    { value: "docs", name: "docs:      Обновление документации" },
    { value: "feat", name: "feat:      Добавление нового функционала" },
    { value: "fix", name: "fix:       Исправление ошибок" },
    {
      value: "refactor",
      name:
        "refactor:  Правки кода без исправления ошибок или добавления новых функций"
    },
    { value: "revert", name: "revert:    Откат на предыдущие коммиты" },
    {
      value: "style",
      name:
        "style:     Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)"
    },
    { value: "test", name: "test:      Добавление тестов" }
  ],

  scopes: [
    { name: "static" },
    { name: "main" },
  ],

  messages: {
    type: "Какие изменения вы вносите?",
    scope: "\nВыберите ОБЛАСТЬ, которую вы изменили (опционально):",
    customScope: "Укажите свою ОБЛАСТЬ:",
    subject: "Напишите КОРОТКОЕ описание:\n",
    body:
      'Напишите ПОДРОБНОЕ описание (опционально). Используйте "|" для новой строки:\n',
    footer:
      "Место для доп информации:\n",
    confirmCommit: "Вас устраивает получившийся коммит?"
  },

  // Разрешим собственную ОБЛАСТЬ
  allowCustomScopes: true,

  // Запрет на Breaking Changes
  allowBreakingChanges: false,

  // Префикс для нижнего колонтитула
  footerPrefix: "INFO:",

  // limit subject length
  subjectLimit: 72
};

exports.up = function (knex) {
    return knex.schema.createTable("tasks", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("task").notNullable();
        table.integer("done");
        table.integer("edited");
        table.string("created_at").notNullable();
        table.string("updated_at").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("tasks");
};

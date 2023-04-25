/* Replace with your SQL commands */
CREATE TABLE `users`
(
    `id`          varchar(36)  not null,
    `firstname`   varchar(128) not null,
    `lastname`    varchar(128) not null,
    `email`       varchar(128) not null unique,
    `password`    varchar(128) not null,
    `valid_until` date         not null,
    `active`      bit default 1,
    primary key (`id`)
);
CREATE TABLE `contacts`
(
    `id`    varchar(36) not null,
    `name`  varchar(128) default null,
    `phone` varchar(128) default null,
    `email` varchar(128) default null,
    primary key (`id`)
);
CREATE TABLE `locations`
(
    `id`        varchar(36)  not null,
    `city`      varchar(128) not null,
    `direction` varchar(128) not null,
    `zipcode`   varchar(128) not null,
    primary key (`id`)
);
CREATE TABLE `headquarters`
(
    `id`          varchar(36)  not null,
    `name`        varchar(128) not null,
    `active`      bit default 1,
    `contact_id`  varchar(36)  not null,
    `location_id` varchar(36)  not null,
    primary key (`id`),
    foreign key (`contact_id`) REFERENCES `contacts` (`id`),
    foreign key (`location_id`) REFERENCES `locations` (`id`)
);

CREATE TABLE `users_headquarters`
(
    `id`          varchar(36)  not null,
    `active`      bit default 1,
    `user_id` varchar(36) not null,
    `headquarter_id` varchar(36) not null,
    foreign key (user_id) references `users`(`id`),
    foreign key (headquarter_id) references `headquarters`(`id`),
    primary key (`id`)
);

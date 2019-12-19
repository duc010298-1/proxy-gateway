set time zone +7;

create table if not exists server_ip
(
    id int primary key,
    ip varchar(15) not null,
    lastUpdate timestamp not null
);

insert into server_ip (id, ip, lastUpdate)
values (1, '127.0.0.1', NOW());